export function formatCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11);
    }
    switch (cpf.length) {
      case 4:
      case 5:
      case 6:
        cpf = cpf.replace(/(\d{3})(.*)/, '$1.$2');
        break;

      case 7:
      case 8:
      case 9:
        cpf = cpf.replace(/(\d{3})(\d{3})(.*)/, '$1.$2.$3');
        break;

      case 10:
      case 11:
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(.*)/, '$1.$2.$3-$4');
        break;
        
      default:
        break;
    }
    return cpf;
  }
  
  export function validateCpf(cpf) {
      if (!cpf) {
          return false;
      }
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length < 11) {
          return false;
      }
      let sum = 0;
      let rest;
        if (cpf === '00000000000') {
            return false;
        }
        for (let i=1; i<=9; i++) {
            sum = sum + parseInt(cpf.substring(i-1, i)) * (11-i);
        }
        rest = (sum * 10) % 11;
      if ((rest === 10) || (rest === 11)) {
          rest = 0;
      }
      if (rest !== parseInt(cpf.substring(9, 10)) ) {
          return false;
      }
        sum = 0;
      for (let i = 1; i <= 10; i++) {
          sum = sum + parseInt(cpf.substring(i-1, i)) * (12-i);
      }
      rest = (sum * 10) % 11;
      if ((rest === 10) || (rest === 11)) {
          rest = 0;
      }
      if (rest !== parseInt(cpf.substring(10, 11) )) {
          return false;
      }
      return true;
  }
  