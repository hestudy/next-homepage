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

const IFrameForm = (props: { onSuccess?: () => void }) => {
  const form = useForm({
    defaultValues: {
      url: "",
      name: "",
    },
  });

  const componentCreateMutation = api.component.create.useMutation({
    onSuccess() {
      toast.success("Component created");
      props.onSuccess?.();
    },
  });

  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>IFrame</DialogTitle>
        <DialogDescription>
          Add an IFrame to your page to embed another website.
        </DialogDescription>
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
                  <Input {...field}></Input>
                </FormControl>
                <FormDescription>The name of the component.</FormDescription>
                <FormMessage></FormMessage>
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
                /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i,
              message: "Invalid URL",
            },
          }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormDescription>
                  The URL of the website you want to embed.
                </FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            );
          }}
        ></FormField>
        <DialogFooter>
          <Button
            disabled={componentCreateMutation.isPending}
            onClick={async () => {
              if (await form.trigger()) {
                const { name, ...rest } = form.getValues();
                componentCreateMutation.mutate({
                  type: "iframe",
                  data: {
                    ...rest,
                  },
                  name,
                });
              }
            }}
          >
            save
          </Button>
        </DialogFooter>
      </DialogHeader>
    </Form>
  );
};

export default IFrameForm;
