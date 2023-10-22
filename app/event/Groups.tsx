import { TeachingBlock } from "./[id]/FormGroups";

export const Groups = ({
  blocks,
  status,
}: {
  blocks: TeachingBlock[] | null;
  status: string | null;
}) => {
  if (status == "Optimal") {
    return (
      <>
        <h2 className="font-semibold mt-4">Groups</h2>
        {blocks && (
          <div className="my-4 flex flex-col gap-4">
            {blocks.map((block, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 bg-orange-100/50 p-4 rounded-md border border-orange-300"
              >
                <div className="font-semibold">{block.block}</div>
                <ul className="list-disc pl-4">
                  {block.presentations.map((presentation, index) => (
                    <li key={index} className="my-2">
                      {presentation.presenter.topic.name}

                      <span className="text-gray-400">
                        {" ("}
                        {presentation.presenter.name} {" -> "}
                        {presentation.listeners
                          .map((listener) => listener.name)
                          .join(", ")}
                        {")"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </>
    );
  } else if (status == "Infeasible") {
    return <div className="text-red-600">Infeasible</div>;
  } else {
    return <></>;
  }
};
