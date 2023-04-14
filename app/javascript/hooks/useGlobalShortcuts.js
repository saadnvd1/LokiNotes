import { useHotkeys } from "react-hotkeys-hook";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const useGlobalShortcuts = () => {
  const dispatch = useDispatch();

  useHotkeys(
    "meta+c",
    () => {
      dispatch(toggleModal({ modalName: MODAL_NAMES.CREATE_NOTEBOOK }));
    },
    { preventDefault: true, enableOnFormTags: true },
    []
  );
};

export default useGlobalShortcuts;
