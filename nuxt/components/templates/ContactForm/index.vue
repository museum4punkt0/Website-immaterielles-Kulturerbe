<template>
  <div class="form-wrapper">

    <form @submit.prevent="submit(form)" enctype="multipart/form-data">
      
      <div class="input-field-wrapper mc">
        <div class="input-wrapper">
          <label for="name">Name*</label>
          <input required v-model="form.name" type="text" name="name" placeholder=""/>
        </div>    
        <div class="input-wrapper">
          <label for="email">E-Mail*</label>
          <input required v-model="form.email" type="email" name="email"  placeholder=""/>
        </div>           

        <div class="radio-btn-container">
          <label class="radio-general-label">Funktion</label>
          <div class="radio-options">
            <div class="radio-option">
              <label class="custom-radio-container" for="Museumsmitarbeiter*in">Museumsmitarbeiter*in
                <input type="radio" id="Museumsmitarbeiter*in" value="MuseumsmitarbeiterIn" v-model="selectedFunction" />
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="radio-option">
              <label class="custom-radio-container" for="Kulturvermittler*in">Kulturvermittler*in
                <input type="radio" id="Kulturvermittler*in" value="KulturvermittlerIn" v-model="selectedFunction" />
                <span class="checkmark"></span>
              </label>    
            </div>
            <div class="radio-option">
              <label class="custom-radio-container" for="Museumsforscher*in">Museumsforscher*in
                <input type="radio" id="Museumsforscher*in" value="MuseumsforscherIn" v-model="selectedFunction" />
                <span class="checkmark"></span>
              </label>    
            </div>
            <div class="radio-option">
              <label class="custom-radio-container" for="Praktiker*in">Praktiker*in
                <input type="radio" id="Praktiker*in" value="PraktikerIn" v-model="selectedFunction" />
                <span class="checkmark"></span>
              </label>    
            </div>
          </div>         
        </div>

        <div class="input-wrapper">
          <label for="institution">Institution<br>(Museum, Verein, Privatperson)</label>
          <input v-model="form.institution" type="text" name="institution"  placeholder=""/>
        </div>   
        <div class="input-wrapper">
          <label for="phone">Telefon</label>
          <input v-model="form.phone" type="text" name="phone"  placeholder=""/>
        </div>
        <div class="input-wrapper">
          <label for="heritage">Um welches immaterielle Kulturerbe geht es?</label>
          <input v-model="form.heritage" type="text" name="heritage"  placeholder=""/>
        </div>
        <div class="input-wrapper">
          <label for="description">Beschreiben Sie ihr Projekt.</label>
          <textarea v-model="form.description" type="text" name="description"  placeholder=""></textarea>
        </div>                                                           
        <div class="requirements">     
          <label class="custom-radio-container" for="check-privacy-policy">
              <span class="label-text">Ich stimme den <nuxt-link to="/datenschutz" class="">Datenschutzbestimmungen</nuxt-link> zu.*</span>
              <input type="checkbox" id="check-privacy-policy" v-model="privacyCheck">
              <span class="checkmark"></span>
          </label> 
        </div>      
        <!-- {{ buttonDisabled }} -->
        <div class="form-footer">
          <div class="left">* Pflichtfelder</div>
          <div class="right">
            <button class="btn-submit" :class="{'send-animation' : waiting}" type="submit" :disabled="!privacyCheck">
              <template v-if="waiting">wird gesendet …</template>
              <template v-if="!waiting">abschicken</template>
            </button>
            <div class="messages">
              <p v-if="errors" class="error-message">Etwas ist schiefgelaufen, bitte versuchen sie es erneut.</p>
              <p v-if="succsess" class="success-message">✓ Versendet.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>

const selectedFunction = ref('');
const form = ref({
  selectedFunction: '',  
  name: '',
  institution:'',  
  email: '',
  phone: '',
  heritage: '',
  description: ''   
});

const computedForm = computed(() => {
  let tForm = form.value;
  tForm['selectedFunction'] = selectedFunction.value
  return tForm;
})


const errors = ref(false);
const succsess = ref(false);
const waiting = ref(false);

const privacyCheck = ref(false);

const formReset = () => {
  console.log('resetting');
  selectedFunction.value = '';
  form.value = {
    selectedFunction: '',  
    name: '',
    institution:'',  
    email: '',
    phone: '',
    heritage: '',
    description: ''    
	};  
  privacyCheck.value = false;
}


async function submit(computedForm) {
	waiting.value = true;
	await $fetch('/api/contact', {
		method: 'POST',
		body: computedForm,
	})
	.then(() => {
    errors.value = false;
    succsess.value = true;
    waiting.value = false;
    formReset();
  })
  .catch(() => {
    errors.value = true;
    succsess.value = false;
    waiting.value = false;
  });
}
</script>

<style lang="scss" scoped>
.input-field-wrapper{
  background-color: #E6EBB8;
  border-radius: 50px;
  font-family: 'courier';
  padding-top: 40px;
  padding-bottom: 40px;
  @include break($brd){
    padding-top: 150px;
    padding-bottom: 150px;
  }
} 
.input-wrapper,
.radio-btn-container,
.requirements,
.form-footer{
  grid-column: span 6;
  @include break($brd){
    grid-column: 3 / span 8;
  }
  @include break($brmed){
    grid-column: 4 / span 6;
  }    
}
.input-wrapper{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  label{
    padding:  0 10px 0 0;
  }
  input{    
    border: none;
    background-color: $imprintyellow;
    padding: 0 15px;
    position: relative;
    border-radius: 999px;
    height: 32px;
    margin-bottom: 1em;   
  }
  textarea{
    border: none;
    background-color: $imprintyellow;
    border-radius: 16px;
    width: 100%;
    min-height: 150px;
    padding: 10px 15px;
    margin-bottom: 1em;   
  }
}
.radio-general-label{
  margin-bottom: .75em;
  @include break($brd){
    margin-bottom: 0;
  }
}
.radio-btn-container{
  display: flex;
}  
.radio-options{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.radio-option{
  flex: 0 0 50%;
  margin-bottom: 1em;
  padding-right: 20px;
}  
.requirements label{
    display: flex;    
    width: 100%;
    padding: 0;
    .checkmark{
      position: relative;
      left: 0;
    }    
}
.radio-btn-container,
.requirements .custom-radio-container,
.form-footer{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.custom-radio-container{
  .label-text{
    padding-right: 20px;
  }
}

.form-footer{
  margin-top: 2em;
  .left{
    font-size: .75em;
    font-family: 'varela';
  }
  .right{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}
.btn-submit{
    background-color: $fontblue;
    color: $white;
    border-radius: 999px;
    padding: 5px 10px;
    font-family: 'htimes';
    &:disabled{
      cursor: not-allowed;
      opacity: .5;
    }
}
.messages{
  flex: 0 0 100%;
  text-align: right;
  margin-top: 1em;
}
@include break($brd){
  .input-wrapper{
    margin-bottom: 1em;
    display: flex;
    label,
    input,
    textarea{
      flex: 0 0 50%;
    }
  }  
  .requirements{
    .label-text {
      flex: 0 0 50%;
    }
  }
  .form-footer{
    display: flex;
    .left{
      flex: 0 0 50%;
    }
    .right{
      flex: 0 0 50%;
    }    
  }  
}
</style>