import { Star } from "lucide-react";

const columns = [
  {
    accessorKey: "problemId",
    header: "Problem ID",
    size: 100,
  },
  {
    accessorKey: "problemStatement",
    header: "Problem Statement",
    size: 350,
    cell: ({ row }) => (
      <a
        href={row.original.problemLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-title-main hover:underline decoration-title-main"
      >
        {row.getValue("problemStatement")}
      </a>
    ),
  },
  {
    accessorKey: "topic",
    header: "Topic",
    size: 200,
  },
  {
    accessorKey: "revision",
    header: "Revision",
    size: 150,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      );
    },
  },
];

export default columns;
