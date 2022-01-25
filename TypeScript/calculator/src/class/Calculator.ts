type TDetail = { html: string, value: number }

export class Calculator {
    private DetailInfo: string
    private Calc: string
    private SROb: HTMLSpanElement | null

    constructor() {
        this.DetailInfo = ''
        this.Calc = ''
        this.SROb = null
    }

    init(): void {
        try {
            // 获取Ul对象
            const UlEl: HTMLUListElement = document.querySelector('#operate') as HTMLUListElement
            // 获取显示内容的标签对象
            const SpanDetailOb: HTMLSpanElement = document.querySelector('#detail')!
            // 获取显示结果的标签对象
            this.SROb = document.querySelector('#result')!

            if (UlEl) {
                // 注册点击事件
                UlEl.addEventListener('click', e => {
                    const target: HTMLLIElement = (e.target || e.srcElement) as unknown as HTMLLIElement

                    // 根据事件冒泡的原理，找到具体的点击对象
                    if (target) {
                        // 获取value属性值
                        let value = target.getAttribute('value')!
                        let html = value

                        // 获取type
                        let type = target.getAttribute('ctype')!

                        if (!value && type !== '0') return false

                        this.DetailInfo += html
                        this.Calc += value

                        switch (type) {
                            // 清空
                            case '0':
                                this.clear()
                                break
                            // 左右括号计算
                            case '1':
                                this.trigonometric(value)
                                break
                            // 平方或立方
                            case '2':
                                this.sup(value)
                                break
                            // 正负值
                            case '3':
                                this.negative()
                                break
                            // 阶乘
                            case '4':
                                this.factorial()
                                break
                            // 开根号
                            case '5':
                                this.sign()
                                break
                            // 除法处理
                            case '6':
                                this.division()
                                break
                            // π 处理
                            case '7':
                                this.PI()
                                break
                            // 计算圆周长和面积
                            case '8':
                                this.round(value)
                                break
                            // 计算最终结果
                            case '9':
                                this.FinalResult()
                                break
                        }

                        // 拼接完展示数据
                        SpanDetailOb.innerHTML = this.DetailInfo
                    }
                })
            }
        } catch (error: any) {
            if (this.SROb) this.SROb.innerText = error.message
        }
        console.log('%c初始化完成', 'font-size: 20px;color: green;')
    }

    // 三角函数与 log
    trigonometric(type: string): void {
        try {
            // 1 + 30sin =>  1 + 0.5
            const reg = /\-?\d+(sinh?|cosh?|tanh?|log)/
            const regResult = this.Calc.match(reg)!
            // 获取之前的数字
            const v = parseFloat(regResult && regResult[0]) || 0
            let value: number = 0
            switch (type) {
                case 'sin':
                    value = Math.sin(v / 180 * Math.PI)
                    break
                case 'cos':
                    value = Math.cos(v / 180 * Math.PI)
                    break
                case 'tan':
                    value = Math.tan(v / 180 * Math.PI)
                    break
                case 'sinh':
                    value = Math.sinh(v / 180 * Math.PI)
                    break
                case 'cosh':
                    value = Math.cosh(v / 180 * Math.PI)
                    break
                case 'tanh':
                    value = Math.tanh(v / 180 * Math.PI)
                    break
                case 'log':
                    value = Math.log(v)
                    break
            }
            this.Calc = this.Calc.replace(reg, `${value}`)
            this.DetailInfo = this.DetailInfo.replace(reg, `${type}${v}`)
        } catch (error) {
            throw new Error('三角函数报错')
        }
    }

    // 求平方根或立方根
    sup(p: string): void {
        try {
            // 获取最后一个操作符号的位置 5+2 => +2  5 => 5
            const reg = /\-?\d+[sv]/ // /([\+\-\*\%\÷]?)([0-9]+)[sv]$/gi
            const regResult = this.Calc.match(reg)!
            // 获取之前的数字
            const v = parseFloat(regResult && regResult[0]) || 0

            let num = p === 's' ? 2 : 3
            let value: number = Math.pow(v, num)

            this.Calc = this.Calc.replace(reg, `${value}`)
            this.DetailInfo = this.DetailInfo.replace(reg, `${v}<sup>${num}</sup>`)
        } catch (error) {
            throw new Error('平方根或立方根报错')
        }
    }

    // 正负值
    negative(): void {
        throw new Error('为实现')
    }

    // 阶乘
    factorial(): void {
        function f(num: number): number {
            if (num === 1) {
                return 1
            }
            return num * f(num - 1)
        }

        try {
            const reg = /\d+\!/
            const regResult = this.Calc.match(reg)!
            // 获取之前的数字
            const v = parseFloat(regResult && regResult[0]) || 0
            const value = f(v)
            this.Calc = this.Calc.replace(reg, `${value}`)

        } catch (error) {
            throw new Error('阶乘报错')
        }
    }

    // 开根号
    sign(): void {
        try {
            const reg = /\-?\d+\√/
            const regResult = this.Calc.match(reg)!
            // 获取之前的数字
            const v = parseFloat(regResult && regResult[0]) || 0
            const value = Math.sqrt(v)
            this.Calc = this.Calc.replace(reg, `${value}`)
            this.DetailInfo = this.DetailInfo.replace(reg, `√${v}`)
        } catch (error) {
            throw new Error('开根号报错')
        }
    }

    // 除法处理
    division(): void {
        this.Calc = this.Calc.replace(/\÷/, '/')
    }

    // 圆周率处理
    PI(): void {
        const reg = /\-?\d*\π/
        const regResult = this.Calc.match(reg)!
        // 获取之前的数字
        const v = parseFloat(regResult && regResult[0]) || 1
        const value = Math.PI * v
        this.Calc = this.Calc.replace(reg, `${value}`)
    }

    // 计算圆周长和面积
    round(type: string): void {
        const reg = /\-?\d+[SC]/
        const regResult = this.Calc.match(reg)!
        const v = parseFloat(regResult && regResult[0]) || 0
        let value: number = 0
        if (type === 'S') {
            value = Math.PI * v * v
            this.DetailInfo = this.DetailInfo.replace(reg, `π${v}<sup>2</sup>`)
        } else if (type === 'C') {
            value = Math.PI * 2 * v
            this.DetailInfo = this.DetailInfo.replace(reg, `2π${v}`)
        }
        this.Calc = this.Calc.replace(reg, `${value}`)
    }

    // 计算最终结果
    FinalResult(): void {
        if (this.SROb) {
            try {
                console.log(this.Calc)
                this.Calc = this.Calc.replace(/=/, '')
                this.SROb.innerText = eval(this.Calc)
            } catch (error: any) {
                this.SROb.innerText = '无效的表达式'
            }
        }
    }

    // 清空
    clear(): void {
        this.DetailInfo = ''
        this.Calc = ''
        if (this.SROb) {
            this.SROb.innerText = '0'
        }
    }
}