import { PopupCustom } from '@/components/ui/PopupCustom';
import { Button } from '@/components/ui/button';

export default function LogoutConfirmationDialog({
  onClose,
  onConfirm,
  open,
}: {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}) {
  return (
    <PopupCustom.Root
      open={open}
      onClose={onClose}
      size="sm"
      className="max-w-[22rem] border-slate-200 shadow-[0_16px_44px_rgba(15,23,42,0.14)]"
    >
      <div className="px-6 py-7 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          Đăng xuất khỏi phiên này?
        </h2>
        <p className="mx-auto mt-2 max-w-[27ch] text-sm leading-5 text-slate-500">
          Bạn sẽ cần đăng nhập lại để tiếp tục làm việc.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-slate-100 px-5 py-3.5">
        <Button
          variant="ghost"
          onClick={onClose}
          className="rounded-lg text-slate-600 hover:bg-slate-100"
        >
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm} className="rounded-lg px-3.5 shadow-none">
          Đăng xuất
        </Button>
      </div>
    </PopupCustom.Root>
  );
}
