class HandleStripeWebhooks < ActiveInteraction::Base
  string :payload
  string :signature

  def execute
    webhook_secret = Rails.application.credentials.stripe[:webhook_secret]

    if !webhook_secret.empty?
      begin
        Stripe::Webhook.construct_event(
          payload, signature, webhook_secret
        )
      rescue JSON::ParserError => e
        # Invalid payload
        errors.add(:base, "Invalid payload")
        return
      rescue Stripe::SignatureVerificationError => e
        # Invalid signature
        errors.add(:base, "Invalid signature")
        return
      end
    else
      errors.add(:base, "No webhook secret")
      return
    end

    data = JSON.parse(payload, symbolize_names: true)
    event = Stripe::Event.construct_from(data)

    # Get the type of webhook event sent
    data = event["data"]
    data_object = data["object"]

    case event.type
    when "checkout.session.completed"
      CreateSubscription.run!(
        subscription_id: data_object.subscription,
        user: User.find(data_object.metadata.user_id)
      )
    when "invoice.paid"
      if data_object.status == "paid"
        subscription = get_subscription(data_object)

        return if subscription.active?
        subscription.update!(status: Subscription::STATUSES[:active])
      end
    when "invoice.payment_failed"
      subscription = get_subscription(data_object)
      subscription.update!(status: Subscription::STATUSES[:past_due])
    when "customer.subscription.deleted"
      subscription = get_subscription(data_object.id)
      subscription.update!(status: Subscription::STATUSES[:canceled])
    else
      errors.add(:base, "Unhandled event type")
    end

    # TODO: handle the event where a user stops their subscription early `
    # `customer.subscription.updated`
    # maybe we can use it to reach out to see why they stopped their subscription
  end

  private

  def get_subscription(data_object)
    @subscription ||= Subscription.find_by!(stripe_subscription_id: data_object.subscription)
  end
end
