import { createConfirmDialog } from "vuejs-confirm-dialog";
import ConfirmModal from "@/components/ConfirmDelete.vue";

const useConfirmBeforeAction = (action, props) => {
  const { reveal, onConfirm } = createConfirmDialog(ConfirmModal, props);

  onConfirm(action);

  reveal();
};

export default useConfirmBeforeAction;
