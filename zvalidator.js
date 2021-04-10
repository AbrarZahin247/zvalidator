class zValidator{
    constructor(Object){
        this.givenInput = Object.input;
        this.checkParam = Object.checkParam;
        this.valueToCheck = Object.valueToCheck;
        this.errorMessage=Object.errorMessage;
        this.errorSelector=Object.errorSelector;
        this.length= (Object.input).length;
    }

    Validate(){
        if(this.StringCheck()){
            //execute the following codes for string.
        }
        else{
            let convertedInput= this.givenInput.toString();
        }
    }

    StringCheck(){
        if(typeof(this.givenInput)=="string"){
            return true;
        }
        else{
            return false;
        }
    }

    ValidateCorrectLength(minlength,maxlength){
        let state=true;
        if(this.givenInput.length < minlength || this.givenInput.length > maxlength){
            state=false;
            this.InsertErrorMessage(state)
        }
        return state;    
    }

    InsertErrorMessage(state){
        if(this.errorMessage != 'undefined' && this.errorSelector != 'undefined' ){
            if(!state){
                document.querySelector(this.errorSelector).innerText=this.errorMessage;
            }
        }
    }

    SplitCharacterAndNumber(){
        //const CheckArray=[0,1,2,3,4,5,6,7,8,9];
        const CheckAlphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let allCharacters = this.givenInput.split("");
        let Arry= {
            characterArray:[],
            numberArray:[]
        }
        allCharacters.forEach(x=>{
            let y=parseInt(x);
            if(isNaN(y)){
                Arry.characterArray.push(x);
            }
            else{
                Arry.numberArray.push(y);
            }
            
            
        })
        return {characters:Arry.characterArray,numbers:Arry.numberArray}
        
    }

    ValidateAllAreAlphaNum(){
    
        const specialCharacters=['!','@','#','$','%','^','&','*','{','}','[',']',',','.','=','-','(',')','+',';',"'",'"','/','~','<','>','?','|',]
        let splittedArray= this.SplitCharacterAndNumber()
        let characters=splittedArray.characters;
        let i=0;
        let j;
        let state=true;
        while(i<characters.length){
            j=0;
            while(j<specialCharacters.length){
                if(characters[i]==specialCharacters[j]){
                    state=false;
                    this.InsertErrorMessage(state);
                    break;
                }
                j++;
            }
            i++;
        }
        
        return state;

    }

    ValidateAllAreSpecialChar(){
    
        const AlphaNumeric=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,7,8,9];
        let splittedArray= this.SplitCharacterAndNumber()
        let characters=splittedArray.characters;
        let i=0;
        let j;
        let state=true;
        if(splittedArray.numbers.length>0){
            state=false;
        }

        else{

            while(i<characters.length){
                let lowerCasedCharacter=characters[i].toLowerCase();
                j=0;
                while(j<AlphaNumeric.length){
                    if(lowerCasedCharacter==AlphaNumeric[j]){
                        //console.log(lowerCasedCharacter)
                        //console.log(AlphaNumeric[j])
                        state=false;
                        break;                 
                    }
                    j++;
                }
                i++;
            }
    
        }           
        this.InsertErrorMessage(state);
        return state;
    }

    ValidateAllAreNum(){
        let arry= this.SplitCharacterAndNumber();
        let state=false;
        if(arry.characters.length==0){
            state=true;
        }
                
        this.InsertErrorMessage(state);
        return state;
    }
    
}