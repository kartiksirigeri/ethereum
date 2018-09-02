const assert = require('assert');
let get_accounts = require('../accounts-create');
let coined_transaction = require('../transactions-from-coinbase');
let accounts;
let casino_account_index = 0;
const accounts_to_create = 5;

before(async () => {
//    get_accounts().then((list)=>{
//        accounts = list;
//    });
    accounts = await get_accounts(accounts_to_create);

});

describe('Casino', () => {
    it('Create Accounts', () => {
        assert.equal(accounts.length, accounts_to_create);
        console.log("accounts list is\n", accounts);
    });

    accounts.forEach(account => {
        it('Coined Transactions', () => {
            var transaction_state = coined_transaction(account, '0.05');
            if (transaction_state.blockNumber == undefined)
            {
                assert.fail("transaction failed");
            }
            else {
                assert.ok(transaction_state.blockNumber, "success");
            } 
            
        });
    });
});