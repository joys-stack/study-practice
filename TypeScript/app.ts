import { NPerson } from './NPerson'

class User {
    constructor(private _name: string) {
        this._name = _name
    }

    get name(): string {
        return this._name
    }

    set name(value) {
        this._name = value
    }
}

console.log(new User('张三').name)
console.log(NPerson.name)
console.log(NPerson.getName())