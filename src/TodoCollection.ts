import TodoItem from "./TodoItem";

class TodoCollection {
    private nextId: number = 1
    private itemMap: Map<number, TodoItem>

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        this.itemMap = new Map<number, TodoItem>()
        todoItems.forEach(item => this.itemMap.set(item.id, item))
    }

    getTodoById(id: number): TodoItem | undefined {
        return this.itemMap.get(id)
    }

    addTodo(task: string): number {
        while(this.getTodoById(this.nextId)) {
            this.nextId++
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task))
        return this.nextId
    }

    // includeComplete -> true 모든 할 일 반환
    // includeComplete -> false 한 일은 제외하고 반환
    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()].filter((item) => {
            return includeComplete || !item.complete
        })
    }

    removeComplete(): void {
        this.itemMap.forEach((item) => {
            if(item.complete) {
                this.itemMap.delete(item.id)
            }
        })
    }

    markComplete(id: number, complete: boolean): void {
        const todoItem = this.getTodoById(id)
        if(todoItem) {
            todoItem.complete = true
        }
    }

}

export default TodoCollection