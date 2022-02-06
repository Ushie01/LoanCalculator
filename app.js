//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = "none";
    
    //show loader
    document.getElementById('loading').style.display = "block";
    setTimeout(calculateResults, 2000);
    
    e.preventDefault();
});


//Calculate Results
function calculateResults(){
    console.log('Calculating...');
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle * x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);

        //show results
        document.getElementById('results').style.display = "block";

        //hide loader
        document.getElementById('loading').style.display = "none";
        
    } else {
        showError('Please check your number');
    }


    
}

function showError(error){
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = "none";
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv, heading);

    //clear after 3 sec
    setTimeout(clearError, 2000);

    
}

function clearError(){
    document.querySelector('.alert').remove();
};