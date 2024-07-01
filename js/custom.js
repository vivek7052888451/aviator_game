// Function to increment the bet quantity
    function increment() {
        var input = document.getElementById('bet-quantity');
        var value = parseInt(input.value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        input.value = value;
        updateApplyBetButton(value);
    }

    // Function to decrement the bet quantity
    function decrement() {
        var input = document.getElementById('bet-quantity');
        var value = parseInt(input.value, 10);
        value = isNaN(value) ? 0 : value;
        if (value > 1) {
            value--;
            input.value = value;
            updateApplyBetButton(value);
        }
    }

    // Function to update the Apply Bet button text
    function updateApplyBetButton(quantity) {
        var amount = quantity * 10.0; // Assuming each unit is $10.0
        var button = document.querySelector('.apply-bet-button');
        button.textContent = 'Bet $' + amount.toFixed(1) + ' USD';
    }

    // Function to apply the bet
    function applyBet() {
        var quantity = document.getElementById('bet-quantity').value;
        var amount = quantity * 10.0; // Assuming each unit is $10.0
        alert('You applied a bet of $' + amount.toFixed(1));
    }
