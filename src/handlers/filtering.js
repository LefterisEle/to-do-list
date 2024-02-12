const filterMatched = (task, searchText) => {
    return task.text.toLowerCase().includes(searchText.toLowerCase());
};

const completionMatched = (task, completion) => {
    if (completion === 'completed') {
        return task.isCompleted;
    } else return !task.isCompleted;
};

const filteredtasks = (tasks, searchText, completion) =>
    tasks?.filter((task) => {
        if (completion && searchText) {
            return (
                filterMatched(task, searchText) &&
                completionMatched(task, completion)
            );
        } else if (completion) {
            return completionMatched(task, completion);
        } else if (searchText) {
            return filterMatched(task, searchText);
        } else return true;
    });

export default filteredtasks;
