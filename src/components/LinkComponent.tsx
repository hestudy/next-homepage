import { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const LinkComponent = (props: {
  data: Awaited<ReturnType<AppRouter["util"]["fetchMeta"]>>;
}) => {
  const favicon = useMemo(() => {
    const favicon = props.data.favicons?.[0]?.href;
    if (favicon) {
      if (favicon?.includes("http")) {
        return favicon;
      }
      const url = new URL(props.data.url);
      return `${url.origin}${favicon}`;
    }
    return null;
  }, [props.data.favicon]);

  const statusQuery = api.util.fetchUrlStatus.useQuery(
    {
      url: props.data.url,
    },
    {
      refetchInterval: 1000 * 60 * 10,
    },
  );

  return (
    <Link
      className="flex h-full space-x-2 p-2 [&>*]:shrink-0"
      href={props.data.url}
      target="_blank"
    >
      {!!favicon && (
        <Avatar>
          <AvatarImage src={favicon} />
          <AvatarFallback>
            <LinkIcon />
          </AvatarFallback>
        </Avatar>
      )}
      <div className="w-0 flex-1">
        <div className="mb-2 mt-3 text-sm font-medium leading-none">
          {props.data.title}
        </div>
        <p className="text-ellipsis text-sm text-muted-foreground">
          {props.data.description}
        </p>
      </div>
      <div>
        {statusQuery.data && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
        )}
        {!statusQuery.data && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        )}
      </div>
    </Link>
  );
};

export default LinkComponent;
