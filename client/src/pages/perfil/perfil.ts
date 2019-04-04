import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';

import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';

@IonicPage()
@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html',
})
export class PerfilPage {

    dadosUsuario: DadosUsuarioDTO = {
        id: null,
        tipo: "",
        fotoPerfil: "",
        nomeCompleto: "",
        login: "",
        email: "",
        listaEspecialidades: null,
        avaliacao: null,
    };

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public usuarioService: UsuarioService,
        public storageService: StorageService) {
    }

    ionViewDidLoad() {
        this.usuarioService.getMyUser().subscribe(
            response => {
                this.dadosUsuario = response['data'];
            }, error => {
                console.log(error);
            });
    }

    editar() {
        this.navCtrl.push('EditPerfilPage');
    }

    getMediaAvaliacao(nota: number) {
        return ((nota/5)*100) + '%';

    }
}