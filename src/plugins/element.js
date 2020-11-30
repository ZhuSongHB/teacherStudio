import Vue from 'vue';
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {
	Button,
	Form,
	FormItem,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Input,
	Message,
	Container,
	Header,
	Aside,
	Main,
	Menu,
	Notification,
	Submenu,
	MenuItem,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Row,
	Col,
	Table,
	TableColumn,
	Pagination,
	// Dialog,
	MessageBox,
	Tag,
	Loading,
	Drawer,
	// Select,
	// Option,
	// Cascader,
	Tabs,
	Footer,
	TabPane,
	Radio,
	Collapse,
	CollapseItem,
	Alert,
	// TabPane,
	// Carousel,
	// CarouselItem,
	// ElementUI
} from 'element-ui';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
// Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Alert);
// Vue.use(Select);
// Vue.use(Option);
Vue.use(Drawer);
// Vue.use(Cascader);
Vue.use(Tabs);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Footer);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(Collapse);
Vue.use(CollapseItem);
// Vue.use(TabPane);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
Vue.use(Loading.directive);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;

Vue.prototype.$alert = MessageBox.alert;
