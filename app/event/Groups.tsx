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
              <div key={index} className="flex flex-col gap-1">
                <div className="text-gray-500 ">{block.block}</div>
                <>
                  {block.presentations.map((presentation, index) => (
                    <div key={index}>
                      {presentation.presenter.topic.name}

                      <span className="text-gray-400">
                        {" ("}
                        {presentation.presenter.name} {" -> "}
                        {presentation.listeners
                          .map((listener) => listener.name)
                          .join(", ")}
                        {")"}
                      </span>
                    </div>
                  ))}
                </>
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
