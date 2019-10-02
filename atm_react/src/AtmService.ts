export default class AtmService{
    getNotes(amountToWithdraw: number){
        return fetch('https://localhost:5001/api/atm/' + amountToWithdraw)
    }
}