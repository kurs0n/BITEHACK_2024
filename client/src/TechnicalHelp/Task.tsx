type TaskProps = {
    index: number;
    description: string;
  };

const Task = ({ index, description }: TaskProps) => {

    return (
        <li>
        {index}. {description}
        </li>
    );
};

export default Task;