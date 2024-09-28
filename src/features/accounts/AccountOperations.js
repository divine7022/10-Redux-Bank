import { useState } from "react";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const dispatch = useDispatch();
  // use useSelector() is used to get the current state of the the store.

  // DESTRUCTRING
  // renaming the loan amount to currentLoan and loanPurpose to currentLoanPurpose coz the state variable has that same name
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
  } = useSelector((store) => store.account);

  console.log(balance);

  function handleDeposit() {
    // it is a normal guard class
    // if we didn't entered any depositAmount the it just returns.
    if (!depositAmount) return;

    //if we dispatch a function, when Redux see it will know that function is the thunk.then it will execute that function it will not dispatch the action immidetly to the store
    dispatch(deposit(depositAmount, currency));
    // seting deposit amount to initial state(it is basically used to clear the input field after we pressing the deposit button)
    setDepositAmount("");
    setCurrency("INR");
  }
  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Indian Rupees</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          {/*when ever isLoading is true then we can't click the Deposit button */}
          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Coverting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {/* If the  loan is present means loanAmount > 0 then the last pay loan section is visiabl */}
        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} ({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
