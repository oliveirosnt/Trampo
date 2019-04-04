import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { DadosAtualizadosDTO } from '../../models/dados-atualizados.dto';



@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {

  especialidades : string[] = [];

  dadosUsuario : DadosUsuarioDTO = {
    id: null,
    tipo: "",
    fotoPerfil : "",
    nomeCompleto : "",
    login : "",
    email : "",
    avaliacao: null
  };

  dadosAtualizados : DadosAtualizadosDTO = {
    novaFotoPerfil : "",
    novoNomeCompleto : "",
    novoLogin : "",
    novoEmail : "",
    avaliacao: null,
    novaEspecialidades : []
  }
  
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public storageService: StorageService,
    public especialidadesService: EspecialidadesService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getEspecialidades();
    this.usuarioService.getMyUser().subscribe(
      response => {
        this.dadosUsuario = response['data'];
        this.dadosAtualizados.novaEspecialidades = this.dadosUsuario.listaEspecialidades;
        if (this.dadosAtualizados.novaEspecialidades == undefined){
          this.dadosAtualizados.novaEspecialidades = null;
        }
        this.dadosAtualizados.novaFotoPerfil = this.dadosUsuario.fotoPerfil;
        this.dadosAtualizados.novoNomeCompleto = this.dadosUsuario.nomeCompleto;
        this.dadosAtualizados.novoLogin = this.dadosUsuario.login;
        this.dadosAtualizados.novoEmail = this.dadosUsuario.email;
      }, error => {
        console.log(error);
      });
  }

  salvar(dadosAtualizados : DadosAtualizadosDTO) {
    this.usuarioService.atualizaDados(dadosAtualizados).subscribe(
      response => {
        let alertMessage = this.alertCtrl.create({
          message: response.body['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
        this.navCtrl.setRoot('HomePage');
      }, error => {
        let alertMessage = this.alertCtrl.create({
          message: error.error['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
      });
  }

  getEspecialidades(){
    this.especialidadesService.getEspecialidades().subscribe(response => {
      for (var key in response.body){
        this.especialidades.push(response.body[key]['nome']);    
      }
    });      
  }

  atualizarSenha(){
    let senhaModal = this.modalCtrl.create('AtualizaSenhaPage');
    senhaModal.present();
  }

}
