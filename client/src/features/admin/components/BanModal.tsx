import { createPortal } from "react-dom"

type Props = {
  id: number
  isOpen: boolean
  onClose: () => void
}

function BanModal({ id, isOpen, onClose }: Props) {
  if (!isOpen) return null
  return createPortal(
    <div className="absolute inset-0">
      <div className="bg-black/20 w-full h-full" />
    </div>, document.body
  );
}

export default BanModal;