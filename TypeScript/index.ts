import 'reflect-metadata'

function log(title: string): void {
    console.log('\n')
    console.log(`----------------${title}---------------------`)
}

log('练习一')
// 练习一：类的声明
{
    class User {
        name: string
        age: number
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }

        info(): string {
            return `${this.name}的年龄是${this.age}`
        }
    }

    const hd = new User('张三', 18)
    const zs = new User('李四', 22)
    console.log(hd.info(), zs.info()) // 后盾人的年龄是18 张三的年龄是22

    // 类用于变量的类型声明
    const users: User[] = []
    users.push(hd, zs)
    console.log(users) // [ User { name: '后盾人', age: 18 }, User { name: '张三', age: 22 } ]
}

log('练习二')
// 练习二：public 修饰符 
{
    class Person {
        public name: string
        public age: number
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }

        public pinfo(): void {
            // 这种方式没法判断是父类自己调用还是子类调用
            // 特别注意： 子类实例对象 instanceof 父类 的时候也会返回 true
            if (this instanceof User) {
                console.log('我被子类调用了')
            } else {
                console.log('我被自己调用了')
            }
        }
    }

    class User extends Person {
        public hobby: string[]
        constructor(name: string, age: number, hobby: string[]) {
            super(name, age)
            this.hobby = hobby
        }

        public info(): string {
            this.pinfo() // 注意：即使在子类中调用，但this指向的还是父类
            return `姓名：${this.name}、年龄：${this.age}、爱好：${this.hobby.join(' ')}`
        }
    }

    // 父类实例化
    const person = new Person('父三', 20)
    // public修饰的属性和方法 在类的外部可以访问
    console.log(person.name)  //  父三
    person.pinfo() //  我被自己调用了

    // 子类实例化
    const user = new User('子三', 18, ['篮球', '足球'])
    // public 修饰的属性和方法 在子类中可以访问
    console.log(user.name)   // 子三
    console.log(user.info()) // 我被自己调用了  姓名：子三、年龄：18、爱好：篮球 足球
}

log('练习三')
// 练习三：protected 修饰符
{
    class Person {
        protected name: string
        constructor(name: string) {
            this.name = name
        }
        protected info(): string {
            return `姓名是${this.name}`
        }
    }

    class User extends Person {
        constructor(name: string) {
            super(name)
        }
        public show(): string {
            console.log(this.name)
            return this.info()
        }
    }

    // 父类实例化
    const person = new Person('张三')
    // console.log(person.name)   // 报错： 属性“name”受保护，只能在类“Person”及其子类中访问
    // console.log(person.info()) // 报错： 属性“info”受保护，只能在类“Person”及其子类中访问

    // 子类实例化
    const user = new User('李四')
    console.log(user.show()) // 李四  姓名是李四
}

log('练习四')
// 练习四：private 修饰符
{
    class Person {
        private name: string
        constructor(name: string) {
            this.name = name
        }

        public info(): string {
            return `姓名：${this.name}`
        }
    }

    class User extends Person {
        constructor(name: string) {
            super(name)
        }
        show(): string {
            // return this.name 报错：属性“name”为私有属性，只能在类“Person”中访问
            return ''
        }
    }

    // 父类实例化
    const person = new Person('张三')
    // console.log(person.name) // 报错：属性“name”为私有属性，只能在类“Person”中访问
    console.log(person.info())  // 姓名：张三
}

log('练习五')
// 练习五：readonly 修饰符
{
    class Person {
        readonly name: string
        // readonly前面可以加其他修饰符
        protected readonly age: number | undefined
        constructor(name: string, age?: number) {
            // readonly属性在构造函数中可以赋值
            this.name = name
            this.age = age
        }

        setName(): void {
            // this.name = name // 报错：无法分配到 "name" ，因为它是只读属性
        }

        getName(): string {
            return `姓名是：${this.name}`
        }

        // readonly 不能用于修饰方法
        // readonly getName(): string { return this.name } // 报错： "readonly" 修饰符仅可出现在属性声明或索引签名中
    }

    class User extends Person {
        constructor(name: string) {
            super(name)
        }

        public show(): string {
            // this.name = name // 报错：无法分配到 "name" ，因为它是只读属性
            return this.name
        }
    }

    // 父类实例化
    const person = new Person('张三')
    console.log(person.name)      // 张三
    console.log(person.getName()) // 姓名是张三
    // person.name = '李四'  // 报错：无法分配到 "name" ，因为它是只读属性

    // 子类实例化
    const user = new User('李四')
    console.log(user.name)   // 李四
    console.log(user.show()) // 李四
    // user.name = '王五'  // 报错：无法分配到 "name" ，因为它是只读属性
}

log('练习六')
// 练习六：静态修饰符
{
    class Axios {
        // 静态修饰符前面可以加其他修饰符
        public static url: string = 'http://www.baidu.com/api'
        public static getUrl(url: string): string {
            return `${Axios.url}/${url}`
        }
    }

    console.log(Axios.url)  // http://www.baidu.com/api
    console.log(Axios.getUrl('oss/menulist')) // http://www.baidu.com/api/oss/menulist
}

log('练习七')
// 练习七：构造函数
{
    class Person {
        // 可以把属性定义到构造函数的入参中，必须要有修饰符
        constructor(public name: string) {
            // 构造函数汇总可以调用函数
            this.name = this.initName(name)
        }

        private initName(name: string): string {
            return `${name}-Init`
        }
    }

    const person = new Person('张三')
    console.log(person.name) // 张三-Init
}

log('练习八')
// 练习八：单例模式
{
    class Axios {
        private static instance: Axios | null = null
        // 单例模式的情况下，不允许外部直接实例化，所以将构造函数加上 私有(private) 或者 被保护(protected) 修饰符
        protected constructor() { }
        // 声明创建对象的函数
        public static make(): Axios {
            if (!Axios.instance) {
                Axios.instance = new Axios()
            }
            return Axios.instance
        }
    }

    // console.log(new Axios())  报错：类“Axios”的构造函数是受保护的，仅可在类声明中访问
    console.log(Axios.make())  // Axios {}
    console.log(Axios.make() === Axios.make()) // true
}

log('练习九')
// 练习九：get/set 访问器
{
    class Person {
        // 将定义的属性设置为私有，只能通过 get访问其访问
        constructor(private _name: string) {
            this._name = _name
        }

        // 访问器的好处是，在访问数据时候，可以对数据进行其他的处理
        public get name(): string {
            return this._name + '-处理后的数据'
        }

        public set name(value: any) {
            this._name = value + '-设置后的数据'
        }
    }

    const person = new Person('张三')
    console.log(person.name) // 张三-处理后的数据
    person.name = '李四'
    console.log(person.name) // 李四-设置后的数据-处理后的数据
}

log('练习十')
// 练习十：抽象类
{
    abstract class Person {
        // 抽象类无法创建实例，只能被继承，所以不需要构造函数
        // constructor(){}

        // 抽象类里定义的抽象函数和抽象属性 只能定义类型，不能实现, 抽象属性和抽象函数的前面只能使用 public、protected、readonly 修饰符
        abstract _name: string
        abstract setName(name: string): string

        // 抽象类中可以有 public protected 等修饰的函数或属性
        protected eat(): string {
            return '人都需要吃饭'
        }
    }

    class Man extends Person {
        // 继承了抽象类时，必须要实现抽象类中的属性或方法
        public _name: string
        constructor(_name: string) {
            super()
            this._name = _name
        }

        public setName(name: string): string {
            console.log(this.eat())
            this._name = name
            return this._name
        }
    }

    const man = new Man('张三')
    console.log(man._name)  // 张三
    console.log(man.setName('李四'))  // 人都需要吃饭 李四
}

log('练习十一')
// 练习十一：接口-作为对象的类型声明
{
    // 作为类型声明 与 type 声明类型有点类似
    interface Person {
        name: string,
        age: number,
        info?(): string,
        // 可以自定义属性，自定义属性的名称必须是string, 值是 any
        [key: string]: any
    }

    const user: Person = {
        name: '张三',
        age: 18,
        info(): string {
            return `姓名：${this.name}, 年龄：${this.age}`
        },
        // 自定义属性
        height: 189,
        weight: 62,
        hobby: ['篮球', '足球']
    }

    console.log(user) // { name: '张三', age: 18, info: [Function: info], height: 189,  weight: 62, hobby: [ '篮球', '足球' ] }
    console.log(user.info && user.info()) // info可有可无，所以需要先判断是否存在  姓名：张三, 年龄：18
}

log('练习十二')
// 练习十二：接口-用于类实现
{
    interface Person {
        eat(): void
    }

    interface Man {
        work(): void
    }

    class User implements Person, Man {
        constructor(private name: string) {
            this.name = name
        }

        eat(): void {
            console.log('人都需要吃饭')
        }

        work(): void {
            console.log('男人必须要买房，买车')
        }
    }

    new User('张三').eat()  // 人都需要吃饭
    new User('李四').work() // 男人必须要买房，买车
}

log('练习十三')
// 练习十三：接口-与枚举结合的对象类型声明
{
    enum Sex {
        BOY = 1,
        GIRL = 2
    }

    interface UserType {
        name: string,
        age: number,
        sex: Sex
    }

    const zs: UserType = { name: '张三', age: 18, sex: Sex.BOY }
    const ly: UserType = { name: '李玉', age: 20, sex: Sex.GIRL }

    const users: UserType[] = [zs, ly]
    console.log(users) // [ { name: '张三', age: 18, sex: 1 }, { name: '李玉', age: 20, sex: 2 } ]
}

log('练习十四')
// 练习十四：接口-相同名称的多个接口，属性会被合并
{
    interface Person {
        eat(): void
    }

    interface Person {
        sleep(): void
    }

    //const user: Person = { eat(): void { } }  // 报错：类型 "{ eat(): void; }" 中缺少属性 "sleep"，但类型 "Person" 中需要该属性
    const user: Person = { eat(): void { }, sleep(): void { } }
    console.log(user)
}

log('练习十五')
// 练习十五：接口继承
{
    interface Person {
        eat(): void
        sleep(): void
    }

    interface Man extends Person {
        work(): void
    }

    const user: Man = { eat(): void { }, sleep(): void { }, work(): void { } }
    console.log(user)
}

log('练习十六')
// 练习十六：类型声明混用
{
    type Sex = 'boy' | 'girl'
    type Is = boolean

    type UserType = {
        name: string,
        is: Is,
        sex: Sex
        [key: string]: any
    }

    const zs: UserType = { name: '张三', is: true, sex: 'boy', hobby: ['篮球'] }
    const ls: UserType = { name: '李四', is: false, sex: 'girl', sleep(): void { } }

    const users: UserType[] = [zs, ls]
    console.log(users)
}

log('练习十七')
// 练习十七：类型声明合并
{
    interface OtherType { dead(): void }
    type ManType = { name: string, sex: string, work(): void }
    type WomanType = { name: string, sex: string, sleep(): void }
    type PersonType = ManType & WomanType & OtherType

    const zs: PersonType = { name: '张三', sex: '男', work(): void { }, sleep(): void { }, dead(): void { } }
    const ls: PersonType = { name: '李四', sex: '女', work(): void { }, sleep(): void { }, dead(): void { } }

    const users: PersonType[] = [zs, ls]
    console.log(users)
}

log('练习十八')
// 练习十八：类型声明泛型
{
    type UserType = Array<string | number>
    const user: UserType = ['1232', 45]
    console.log(user)
}

log('练习十九')
// 练习十九：函数泛型
{
    function printTypeValue<T>(value: T): any {
        return typeof value
    }
    console.log(printTypeValue<string>('张三'))    // string
    console.log(printTypeValue<number>(123))       // number
    console.log(printTypeValue<boolean>(true))     // boolean
    console.log(printTypeValue<string[]>(['123'])) // object
}

log('练习二十')
// 练习二十：泛型继承
{
    function getLength<T extends { length: number }>(arg: T): number {
        // 因为 T 类型不确定，所以不一定含有 length属性， 因此 T类型需要继承一个含有 length属性的类型
        return arg.length
    }

    console.log(getLength<string>('string'))      // 6
    console.log(getLength<string[]>(['1', '2']))  // 2
    console.log(getLength<number[]>([1, 2]))      // 2
}

log('练习二十一')
// 练习二十一：类泛型
{
    class Data<T>{
        private _users: T[] = []
        constructor(...args: T[]) {
            this._users.push(...args)
        }

        get data(): T[] {
            return this._users
        }
    }

    // 字符串数据
    console.log(new Data<string>('1', '2').data)  // [ '1', '2' ]
    // 数字数据
    console.log(new Data<number>(1, 2).data)      // [ 1, 2 ]
}

log('练习二十二')
// 练习二十二：接口泛型
{
    // 泛型 T 或 D 都是自行命名的，没有要求
    interface Person<B, T> {
        name: string,
        isLock: B,
        hobby: T[]
    }

    type HobbyType = { name: string, description?: string }
    const users: Person<boolean, HobbyType>[] = [
        { name: '张三', isLock: true, hobby: [{ name: '篮球', description: '刺激' }] },
        { name: '李四', isLock: false, hobby: [{ name: '足球', description: '为国争光' }] },
        { name: '王五', isLock: false, hobby: [{ name: '乒乓球' }] }
    ]
    console.log(users)
}

log('练习二十三')
// 练习二十三：类装饰器
{
    // target就是类对象 class Person {}
    const EatDecorator: ClassDecorator = (target: Function): void => {
        // 为类的原型上添加属性
        target.prototype._name = '张三'
        // 为类添加函数
        target.prototype.eat = (): string => {
            return `${target.prototype._name}吃饭`
        }
        console.log(`%c${target}`, 'font-size:16px;color:red;')
    }

    @EatDecorator
    class Person {
    }

    const person = new Person()
    console.log((<any>person)._name)   // 张三
    console.log((<any>person).eat())   // 张三吃饭
    console.log((person as any)._name) // 张三
    console.log((person as any).eat()) // 张三吃饭
}

log('练习二十四')
// 练习二十四：类装饰器，提示案例
{
    const MessageDecatoter: ClassDecorator = (target: Function) => {
        target.prototype.message = (msg: string): void => {
            console.log(msg)
        }
    }

    @MessageDecatoter
    class User {
        login() {
            console.log('提交登录请求');
            (<any>this).message('登录成功')
        }
    }

    const user = new User()
    user.login()  // 提交登录请求  登录成功
}

log('练习二十五')
// 练习二十五：类装饰器工厂
{
    const ClassDecaratorFactory = (type?: string): ClassDecorator => {
        switch (type) {
            case 'man':
                return (target: Function): void => {
                    target.prototype.work = (): void => {
                        console.log('男人必须工作')
                    }
                }
            case 'woman':
                return (target: Function): void => {
                    target.prototype.hz = (): void => {
                        console.log('女人化妆')
                    }
                }
            default:
                return (target: Function): void => {
                    target.prototype.eat = (): void => {
                        console.log('是人就要吃饭')
                    }
                }
        }
    }

    @ClassDecaratorFactory('man')
    class Man { }

    @ClassDecaratorFactory('woman')
    class Woman { }

    @ClassDecaratorFactory()
    class Person { }

    const man = new Man();
    (<any>man).work();    // 男人必须工作
    const woman = new Woman();
    (<any>woman).hz();    // 女人化妆
    const person = new Person();
    (<any>person).eat()   // 是人就要吃饭
}

log('练习二十六')
// 练习二十六：函数装饰器
{
    const MethodDecarator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
        console.log(target)      // {}
        console.log(propertyKey) // eat
        console.log(descriptor)  // { value: [Function: eat], writable: true, enumerable: false, configurable: true }
        // 保存原来的函数
        const method = descriptor.value
        // 改变原来的函数
        descriptor.value = (): void => {
            // 调用原来的函数
            method()
            console.log('我是新加入到函数中的')
        }
    }

    class Person {
        @MethodDecarator
        eat() {
            console.log('正在吃饭')
        }
    }

    const person = new Person()
    person.eat()  // 正在吃饭  我是新加入到函数中的
}

log('练习二十七')
// 练习二十七：函数装饰器工厂 - 延时执行
{
    const MethodDecaratorFactory = (value: number): MethodDecorator => {
        return (...arg: any[]): void => {
            const [, , decrator] = arg
            const method = decrator.value

            decrator.value = (): void => {
                // 延时执行
                setTimeout(() => {
                    if (value > 0) {
                        console.log(`${value}ms后，我执行了`)
                    } else {
                        console.log('我立即执行了')
                    }
                    method()
                }, value)
            }
        }
    }

    class Sleep {
        @MethodDecaratorFactory(0)
        show(): void {
            console.log('延时执行')
        }

        @MethodDecaratorFactory(3000)
        sleep(): void {
            console.log('执行')
        }
    }

    const sleep = new Sleep()
    //sleep.show()  // 我立即执行了   延时执行
    //sleep.sleep() // 3000ms后，我执行了  执行
}

log('练习二十八')
// 练习二十八：函数装饰器 - 错误收集器
{
    const ErrorDecarator: MethodDecorator = (target: Object, propskey: string | symbol, descriptor: PropertyDescriptor): void => {
        const method = descriptor.value
        descriptor.value = (name?: string): void => {
            try {
                method(name)
            } catch (error: any) {
                console.log(`错误提示：%c${error.message}`, 'font-size:20px;color: gray;')
            }
        }
    }

    class Person {
        @ErrorDecarator
        show(name: string): void {
            if (name.length > 4) {
                throw new Error('无效的姓名')
            }
            console.log(name)
        }

        @ErrorDecarator
        save(): void {
            throw new Error('保存信息出错')
        }
    }

    const person = new Person()
    person.show('张三')    // 张三
    person.show('独怜幽草涧边生')  // 错误提示：无效的姓名
    person.save()  // 错误提示：保存信息出错
}

log('练习二十九')
// 练习二十九：函数装饰器工厂 - 权限校验
{
    interface IUser {
        name: string,
        permissions: any[]
    }

    const AccessDecaratorFactory = (value: any[]): MethodDecorator => {
        return (...args: any[]): void => {
            const [, , descriptor] = args
            const method = descriptor.value
            descriptor.value = function (p: any[]): void {
                const valid = value.every(key => {
                    return p.indexOf(key) > -1
                })

                if (valid) {
                    method(p)
                } else {
                    console.log('没有权限访问')
                }
            }
        }
    }

    class User<T>{
        constructor(private arg: T) {
            this.arg = arg
        }

        get info(): T {
            return this.arg
        }

        @AccessDecaratorFactory(['save'])
        save(value: any[]): void {
            console.log('保存信息')
        }

        @AccessDecaratorFactory(['get'])
        get(value: any[]): void {
            console.log('获取信息')
        }
    }

    const zs = new User<IUser>({ name: '张三', permissions: ['get'] })
    console.log(zs.info) //  { name: '张三', permissions: ['get' ] }
    zs.get(zs.info.permissions)  //  获取信息
    zs.save(zs.info.permissions) //  没有权限访问

}

log('练习三十')
// 练习三十：函数装饰器 - 异步请求
{
    type UserType = { name: string, age: number, description?: string }

    interface IResponse {
        code: string,
        error: string,
        response: UserType[] | Object
    }

    const ResponseDecaratorFactory = (url: string): MethodDecorator => {
        return (...arg: any[]): void => {
            const [, , descriptor] = arg
            const method = descriptor.value
            console.log(url)
            new Promise<IResponse>((resolve: any, reject: any) => {
                resolve({ code: '200', error: '', response: [{ name: '张三', age: 18, sex: 1 }, { name: '李四', age: 18, description: '篮球运动员' }] })
            }).then(res => {
                method(res)
            })
        }
    }

    class User {
        @ResponseDecaratorFactory('https://www.baidu.com/api/getall')
        all(user: IResponse): void {
            // 模拟 异步请求获取所有数据
            /* if (user && user.code === '200') {
                console.log('获取成功')
                console.log(user)
            } else {
                console.log('获取失败')
            } */
        }
    }
}

log('练习三十一')
// 练习三十一：属性装饰器
{
    const PropertyDecarator: PropertyDecorator = (target: Object, key: string | symbol): void => {
        console.log(target, key) // {}  name
    }

    class User {

        @PropertyDecarator
        private name: string = '张三'
    }

    new User()
}

log('练习三十一')
// 练习三十一：属性装饰器 - 字符串转小写
{
    const LowerDecarator: PropertyDecorator = (target: Object, key: string | symbol): void => {
        let value: string
        Object.defineProperty(target, key, {
            get() {
                return value.toLocaleLowerCase()
            },
            set(_value) {
                value = _value
            }
        })
    }

    class User {
        @LowerDecarator
        private _name: string
        constructor(name: string) {
            this._name = name
        }

        get name(): string {
            return this._name
        }

        set name(value: string) {
            this._name = value
        }
    }

    const user = new User('ADMIN')
    console.log(user.name) // admin
    user.name = 'Joy'
    console.log(user.name) // joy
}

log('练习三十二')
// 练习三十二：属性装饰器 - 随机颜色
{
    const colors: string[] = ['green', 'red', '#383838']
    const PropDecorator: PropertyDecorator = (target: Object, key: string | symbol): void => {
        Object.defineProperty(target, key, {
            get(): string {
                return colors[Math.floor(Math.random() * colors.length)]
            }
        })
    }

    class User {
        @PropDecorator
        public static _color: string = ''
    }

    console.log(User._color) // green
    console.log(User._color) // red
    console.log(User._color) // #383838
}

log('练习三十三')
// 练习三十三：参数装饰器
{
    const ParamDecarator: ParameterDecorator = (target: Object, key: string | symbol, index: number): void => {
        console.log(target, key, index) // [class User] undefined 1
    }

    class User {
        private name: string = '张三'
        constructor(name: string, @ParamDecarator age: number) {

        }
    }
}

log('练习三十四')
// 练习三十四：元数据
{
    // 元数据表示是对数据进行描述的数据
    const user: { name: string } = { name: '张三' }
    // 定义元数据，对 user中的name属性值进行描述
    // 第一个参数：定义元数据的 key
    // 第二个参数：定义元数据的 value
    // 第三个参数：定义元数据的目标对象
    // 第四个参数（可选）：指定目标对象中的具体属性
    Reflect.defineMetadata('name', '个子高', user, 'name')
    // 获取元数据
    const a = Reflect.getMetadata('name', user, 'name')
    console.log(a)  // 个子高
}

log('练习三十五')
// 练习三十五：参数装饰器 - 参数验证
{
    // 参数装饰器
    const ParamDecarator: ParameterDecorator = (target: Object, key: string | symbol, index: number): void => {
        const requires: number[] = []
        requires.push(index)
        Reflect.defineMetadata('require', requires, target, key)
    }

    // 错误函数装饰器
    const ErrorDecorator: MethodDecorator = (target: Object, key: string | symbol, descriptor: PropertyDescriptor): void => {
        const method = descriptor.value
        descriptor.value = function (): void {
            try {
                // call  传参是按照每一项去传  
                // apply 传数组
                // bind  传参与call一样，但是他返回一个函数，需要手工调用
                method.call(this, ...arguments)
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    // 函数装饰器
    const MethodDecorator: MethodDecorator = (target: Object, key: string | symbol, descriptor: PropertyDescriptor): void => {
        const method = descriptor.value

        // 获取元数据
        const requires: number[] = Reflect.getMetadata('require', target, key)
        console.log(requires)
        descriptor.value = function (): void {
            requires.forEach(item => {
                if (item < arguments.length - 1) {
                    throw new Error('参数缺少')
                }

                if (arguments[item] === undefined) {
                    throw new Error('无效的参数')
                }
            })

            method.call(this, ...arguments)
        }
    }

    class User {
        constructor() { }

        @ErrorDecorator
        @MethodDecorator
        findUser(id: number, @ParamDecarator description: string | undefined) {
            console.log('执行成功')
        }
    }

    new User().findUser(1, '张三')     // 执行成功
    new User().findUser(1, undefined)  // 无效的参数
}

log('练习三十六')
// 练习三十六：命名空间
namespace User {
    export let name: string = '张三'
    export namespace Description {
        export let Hobby: string[] = ['篮球']
    }
}
console.log(User.name)   // 张三
console.log(User.Description.Hobby) // ['篮球']

namespace Member {
    export let name: string = '李四'
}
console.log(Member.name) // 李四

// 多个文件打包到一个文件
// 方式一：tsc --outFile dist/build.js index.ts NPerson.ts
// 方式二：主文件中引入其他文件 reference 然后打包主文件 tsc --outFile dist/build.js index.ts

/// <reference path='NPerson.ts' />
// console.log(NPerson.name)
// console.log(NPerson.getName())

log('练习三十七')
// 练习三十七：补充-函数重载
{
    interface Person {
        eat(): void
        eat(food: string): string
        eat(food: string, coff: string): string
    }

    interface Man {
        work(): void
    }

    class User implements Person, Man {
        constructor(private name: string) {
            this.name = name
        }

        eat(): void
        eat(food: string): string
        eat(food: string, coff: string): string
        eat(food?: any, coff?: any): string | void {
            // 函数重载实现：根据参数类型执行不同的函数
        }
        work(): void {
            console.log('男人必须要买房，买车')
        }
    }

    new User('张三').eat('苹果')
    new User('李四').eat()
}