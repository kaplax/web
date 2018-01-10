{
    class Parent {
        constructor(name = 'imooc') {
            this.name = name
        }
    }
    class Child extends Parent {
        constructor(name = 'child') {
            super(name)
        }
    }
    let li = new Child();
    console.log(li)
}
{
    // getter setter
    class Parent {
        constructor(name = 'imooc') {
            this.name = name;
        }
        get longName() {
            return 'mk' + this.name
        }
        set longName(value){
            this.name = value;
        }
    }
    let li = new Parent();
    console.log('getter' ,li.longName);
    console.log('setter' ,li.longName='hello');
}
{
     // 静态方法
     class Parent {
        constructor(name = 'imooc') {
            this.name = name;
        }
        static tell(){
            console.log( Parent.age )
            console.log('tell');
        }
    }
    Parent.age = 11;
    Parent.tell();    
}