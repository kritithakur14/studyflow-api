export default function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#a5a4e2] p-6 rounded-lg w-96 shadow">
        <h2 className="text-lg font-semibold text-[#061f44] mb-4 text-center">
          {message || "Are you sure you want to delete this?"}
        </h2>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#fcf6f8] text-[#061f44] rounded hover:bg-[#eae7e7]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#aa243b] text-white rounded hover:bg-[#88081e]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
