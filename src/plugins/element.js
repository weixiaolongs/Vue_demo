import Vue from 'vue'
import { 
    Button, 
    Form, 
    FormItem, 
    Input, 
    Message,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Menu,
    MenuItemGroup,
    MenuItem,
    Submenu,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    MessageBox,
    Select,
    Option,
    Switch,
    Transfer
 } from 'element-ui'

// Vue.use　会触发 Button里面的install方法, Vue.component() 注册全局组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Transfer)
// Vue.component(Button.name, Button)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
