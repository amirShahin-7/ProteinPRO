import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

const Contact = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="bg-gradient-to-br from-[#232946]/90 to-[#181c2b]/90 border border-white/10 shadow-2xl rounded-3xl backdrop-blur-xl p-6 text-gray-100 relative overflow-hidden"
    >
      {/* Decorative gradient overlays */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-2xl z-0" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-2xl z-0" />
      <DialogHeader className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea] drop-shadow-lg z-10">
        Send us a message
      </DialogHeader>
      <DialogBody className="flex flex-col gap-4 z-10">
        <Input
          label="Email"
          type="email"
          className="text-white"
          labelProps={{ className: "text-[#00c6fb] font-semibold" }}
          crossOrigin="anonymous"
        />
        <Input
          label="Phone Number"
          type="tel"
          className="text-white"
          labelProps={{ className: "text-[#00c6fb] font-semibold" }}
          crossOrigin="anonymous"
        />
        <Textarea
          label="Your Message"
          className="text-white"
          labelProps={{ className: "text-[#00c6fb] font-semibold" }}
          crossOrigin="anonymous"
        />
      </DialogBody>
      <DialogFooter className="flex justify-end gap-2 z-10">
        <Button
          variant="text"
          className="text-gray-300 hover:text-[#ffb86b]"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold shadow-md hover:scale-105 transition-transform"
          onClick={() => {
            onClose();
            alert("Message sent!");
          }}
        >
          Send
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Contact;
