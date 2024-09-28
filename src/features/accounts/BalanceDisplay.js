import { connect, useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

//This is the modren way of using Redux .
// function BalanceDisplay() {
//   const balance = useSelector((store) => store.account.balance);
//   return <div className="balance">{formatCurrency(balance)}</div>;
// }

// This is older way of using Redux i,e connect API.
function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// older way of using the Redux hook is using the connect api

// this recives the state object from the store and we have to returns in which we can define the name of a prop  that our component should recive
// As the name of the function says it map the state to Props
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
// this connect(mapStateToProps) will return a new function , the (BalanceDisplay) component will then be the argument of that new function. So that new function will basically a new component, and that new component will then hava a balance prop( which is a property in store)
export default connect(mapStateToProps)(BalanceDisplay);
