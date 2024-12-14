type TaskProps = {
  index: number;
  description: string;
  icon?: string; // Add the icon as an optional prop
};

const Task: React.FC<TaskProps> = ({ index, description, icon }) => {
  return (
    <div className="group">
      <span className="text-sm text-stone-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Kliknij by uzyskac wiecej informacji
      </span>
      <li
        className="flex flex-
      col items-start bg-1 p-2 pl-6 border-stone-800 border-l-4 rounded-r-xl w-fit"
      >
        {" "}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-semibold text-stone-800 mr-4">{index}.</span>
          <span>{description}</span>
          {icon && <img src={icon} alt={`icon-${index}`} className="h-12 rounded-xl" />}
        </div>
      </li>
    </div>
  );
};

export default Task;
