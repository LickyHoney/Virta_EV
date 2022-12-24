// export const MContext = React.createContext();  //exporting context object
// export default class MyProvider extends Component {
// state = {id: ""}
// render() {
//         return (
//             <MContext.Provider value={
//             {   state: this.state,
//                 setMessage: (value) => this.setState({
//                             id: value })}}>
//             {this.props.children}   //this indicates that all the child tags with MyProvider as Parent can access the global store.
//             </MContext.Provider>)
//     }
// }