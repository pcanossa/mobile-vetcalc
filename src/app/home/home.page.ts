import { Component } from '@angular/core';
import { AdMob, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() {}

  ionViewDidEnter() {
    console.log("A página entrou na tela, chamando o banner...");
    this.showBannerAd();
  }

  peso : any;
  dosagem : any;
  concentracao: any;
  apresentacao = '';
  tipoApresentacao = '';
  tipoLiquido = '';
  resultado : any = null
  poso : any = null

  calculaDose () : number {
    console.log("Peso:", this.peso, "Dosagem:", this.dosagem);
    if (isNaN(this.peso) || isNaN(this.dosagem)) {
      console.warn("Erro: peso ou dosagem inválidos.");
      return 0;
    }
    this.poso = this.peso * this.dosagem;
    return this.poso
  }

  calculaLiquido () {
    const dose = this.calculaDose();
    let res = 0;
    if (this.tipoApresentacao == 'mgml') {
      res = dose/this.concentracao
    } else {
      res = dose/(this.concentracao*10)
    }
    if (this.apresentacao == 'gotas') {
       const gotas = res/0.05
      return `A dose é de ${gotas} gotas.`
    }


    return `A dosagem é de ${res}ml.`
  }

  calculaComprimido () {
    const dose = this.calculaDose();
    const cp = dose/this.concentracao;
    let cpInteiro = Math.floor(cp);
    const part = cp % 1;
    let residual = 0;
    let cpComplemento = '';
    if (part < 0.1 ){
      if (cpInteiro < 1) {
          return `Dose mínima de partição, muito elevada.
          Concentração incompatível.`
      }
    }
    if (part> 0.01) {
      if ((part > 0.1 && part < 0.31)) {
          cpComplemento='e 1/4';
          residual=0.25;
          }
      if ((part > 0.3 && part< 0.61)) {
          cpComplemento='e 1/2';
          residual=0.50;
          }
      if ((part > 0.6 && part< 0.81)) {
          cpComplemento='e 3/4';
          residual=0.75;
          }
      if (part > 0.76) {
          residual=0;
          if (cpInteiro>=1) {
              cpComplemento='0';
              cpInteiro++;
              }
          else {
              cpComplemento = '0';
              cpInteiro = 1;
              return `A dose é de ${cpInteiro} comprimido(s). Essa dose representa ${cpInteiro*this.concentracao}mg.`
            }

          }

          return `A dose é de ${cpInteiro} ${cpComplemento} comprimido(s). Essa dose representa ${(cpInteiro*this.concentracao)+(residual*this.concentracao)}mg.`

        }
        return `A dose é de ${cpInteiro} comprimido(s). Essa dose representa ${cpInteiro*this.concentracao}mg.`
      }



  calculaDosagemFinal () {

    if (this.peso == null || this.dosagem == null || this.concentracao == null) {
      this.resultado = `Dados necessários para o cálculo não inseridos.`
      return
    }

    if (this.apresentacao != 'comprimido' ) {
      this.resultado = this.calculaLiquido()
    } else {
      this.resultado = this.calculaComprimido()
    }
  }

  logs () {
    console.log (
      `peso: ${this.peso},
      dosagem: ${this.dosagem},
      concentracao: ${this.concentracao},
      apresentação: ${this.apresentacao},
      tipo de apresentacao: ${this.tipoApresentacao}

      `
    )
  }

  async showBannerAd() {
    console.log("Tentando mostrar o banner...");
    const options: BannerAdOptions = {
    adId: 'ca-app-pub-3940256099942544/6300978111', // Mantenha o seu Ad Unit ID de Banner
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true,
  };

    await AdMob.showBanner(options);
    console.log("Comando AdMob.showBanner foi executado.");
  }

  async hideBannerAd() {
    await AdMob.hideBanner();

  }

}
