import { useSelector } from "react-redux";

function Customer() {
  // hook used to read data from the store.
  // when ever the store changes then this component subscribled to that store will re render.
  const customer = useSelector((store) => store.customer.fullName);
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
