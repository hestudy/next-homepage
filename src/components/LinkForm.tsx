import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const LinkForm = (props: { onSuccess?: () => void }) => {
  const form = useForm({
    defaultValues: {
      url: "",
      name: "",
    },
  });

  const fetchMetaMutation = api.util.fetchMeta.useMutation({
    onMutate() {
      toast.loading("Fetching...");
    },
    onSettled() {
      toast.dismiss();
    },
    onSuccess(data) {
      createMutation.mutate({
        ...form.getValues(),
        type: "link",
        data: {
          ...data,
        },
      });
    },
  });

  const createMutation = api.component.create.useMutation({
    onMutate() {
      toast.loading("Creating...");
    },
    onSettled() {
      toast.dismiss();
    },
    onSuccess() {
      toast.success("Created");
      props.onSuccess?.();
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Link</DialogTitle>
        <DialogDescription>Add a link to a website</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage></FormMessage>
                <FormDescription>
                  The name of the website you want to add
                </FormDescription>
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="url"
          rules={{
            required: "URL is required",
            pattern: {
              value:
                /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
              message: "Invalid URL",
            },
          }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage></FormMessage>
                <FormDescription>
                  The URL of the website you want to add
                </FormDescription>
              </FormItem>
            );
          }}
        ></FormField>
      </Form>
      <DialogFooter>
        <Button
          disabled={fetchMetaMutation.isPending || createMutation.isPending}
          onClick={async () => {
            if (await form.trigger()) {
              fetchMetaMutation.mutate({
                url: form.getValues("url"),
              });
            }
          }}
        >
          Add
        </Button>
      </DialogFooter>
    </>
  );
};

export default LinkForm;
