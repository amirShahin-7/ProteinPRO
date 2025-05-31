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
      className="bg-white p-4 rounded shadow-lg"
    >
      <DialogHeader>Send us a message</DialogHeader>
      <DialogBody className="flex flex-col gap-4">
        <Input label="Email" type="email" />
        <Input label="Phone Number" type="tel" />
        <Textarea label="Your Message" />
      </DialogBody>
      <DialogFooter className="flex justify-end gap-2">
        <Button variant="text" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="filled"
          color="blue"
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




