import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import * as FileSaver from 'file-saver';
import { ResultState } from '../store/result/result.state';
import { AlertsService } from './alerts.service';
import { AlertController, isPlatform, Platform } from '@ionic/angular/standalone';
import * as JsonToXML from "js2xmlparser";
import { Entry } from '../models';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import * as XLSX from 'xlsx';
import * as nanoid from 'nanoid';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const XML_TYPE =
    'application/xml;charset=UTF-8';

const XML_EXTENSION = '.xml';

const FORMAT = 'xlsx'

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    private translate = inject(TranslateService);

    private store = inject(Store);

    private platform = inject(Platform);

    private alert = inject(AlertsService);

    private alertController = inject(AlertController);

    async shareEntry(entry: Entry) {
        // let pointsListArray;
        let www = entry.waiters.map((wa: any) => {
            // pointsListArray = wa.pointsList.map((po: any) => {
            //     return {
            //         label: this.translate.instant(po.label)
            //     }
            // });
            return wa = {
                // avatar: wa.avatar,
                hours: wa.hours,
                name: wa.name,
                // pointsList: pointsListArray,
                tipsShare: wa.tipsShare,
                totalPoints: wa.totalPoints,
            }
        });
        const newEntry = {
            date: entry.date,
            tipsMade: entry.tipsMade,
            waiters: www
        };
        // const xml = JsonToXML.parse("tips", newEntry);
        const id = nanoid.nanoid(5);
        this.onCreateExcel([newEntry], id);
        // this.saveAsXMLFile(xml, 'tips_list_xml');
    }
    async onCreateExcel(json: any[], inId: string) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(json[0].waiters);
        const newRows = [
            [`${json[0].date}`, `£ ${json[0].tipsMade}`]
        ];

        XLSX.utils.sheet_add_aoa(worksheet, newRows, { origin: -1 });

        XLSX.utils.book_append_sheet(workbook, worksheet, inId);

        const data = XLSX.write(workbook, { bookType: FORMAT, type: "base64" });

        await Filesystem.requestPermissions();

        await Filesystem.writeFile({
            data: data,
            path: `${inId}.${FORMAT}`,
            directory: Directory.Documents,
        });
        const { uri } = await Filesystem.getUri({
            path: `${inId}.${FORMAT}`,
            directory: Directory.Documents,
        });

        // console.log('#️⃣', uri);

        const alertButtons = [
            {
                text: 'Cancel',
                role: 'cancel',
                htmlAttributes: {
                    'aria-label': 'cancel',
                },
            },
            {
                text: 'OK',
                role: 'confirm',
                htmlAttributes: {
                    'aria-label': 'confirm',
                },
                handler: async () => {
                    try {
                        if (isPlatform('capacitor')) {
                            await FileOpener.openFile({ path: uri });
                        } else {
                            const file = await Filesystem.readFile({
                                path: `${inId}.${FORMAT}`,
                                directory: Directory.Documents
                            });
                            const blob = this.b64toBlob(file.data, '');
                            const blobUrl = URL.createObjectURL(blob);
                            let a = document.createElement('a');
                            document.body.appendChild(a);
                            a.setAttribute('style', 'display: none');
                            a.href = blobUrl;
                            a.download = `${inId}.${FORMAT}`;
                            a.click();
                            window.URL.revokeObjectURL(blobUrl);
                            a.remove();
                        }
                    } catch (e) {
                        console.error(e);
                    }
                },
            },
        ];
        const alert = await this.alertController.create({
            subHeader: this.translate.instant('WANT_OPEN_XLS'),
            message: this.translate.instant('EXPLAIN_OPEN_XLS'),
            buttons: alertButtons,
        });

        await alert.present();

    }

    b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    async shareFullResultList() {
        const resultList = this.store.selectSnapshot(ResultState.getResultList);
        let pointsListArray: any;
        let myres;
        let www;
        if (resultList && resultList.length > 0) {
            myres = resultList.map((result) => {
                www = result.waiters.map((wa: any) => {
                    pointsListArray = wa.pointsList.map((po: any) => {
                        return {
                            label: this.translate.instant(po.label)
                        }
                    });
                    return wa = {
                        avatar: wa.avatar,
                        hours: wa.hours,
                        name: wa.name,
                        pointsList: pointsListArray,
                        tipsShare: wa.tipsShare,
                        totalPoints: wa.totalPoints,
                    }
                });
                return {
                    date: result.date,
                    tipsMade: result.tipsMade,
                    waiters: www
                }
            });
            const xml = JsonToXML.parse("tips_list", myres);
            this.saveAsXMLFile(xml, 'tips_list_xml');
        } else {
            const mes = this.translate.instant('LETS_START');
            await this.alert.presentSimpleAlert(mes);
        }
    }

    async saveAsXMLFile(xml: string, fileName: string): Promise<void> {
        const path: string = fileName + '_export_' + new Date().getTime() + XML_EXTENSION;
        if (this.platform.is('capacitor')) {
            const url = await Filesystem.writeFile({
                path: path,
                data: xml,
                directory: Directory.Library,
                encoding: Encoding.UTF8,
            });
            const donwlo: any = await Filesystem.downloadFile({
                path: path,
                url: url.uri,
                directory: Directory.Documents,
            });
            if (donwlo.path) {
                const alertButtons = [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        htmlAttributes: {
                            'aria-label': 'cancel',
                        },
                    },
                    {
                        text: 'OK',
                        role: 'confirm',
                        htmlAttributes: {
                            'aria-label': 'confirm',
                        },
                        handler: async () => {
                            try {
                                // const fileOpenerOptions: FileOpenerOptions = {
                                //     filePath: donwlo.path,
                                //     contentType: 'application/xml',
                                //     openWithDefault: true,
                                // };
                                // await FileOpener.open(fileOpenerOptions);
                            } catch (e) {
                                console.error(e);
                            }
                        },
                    },
                ];
                const alert = await this.alertController.create({
                    subHeader: this.translate.instant('WANT_OPEN_XML'),
                    message: this.translate.instant('EXPLAIN_OPEN_XML'),
                    buttons: alertButtons,
                });

                await alert.present();
            }

        } else {
            await this.confirmAlert(xml);
        }
    }

    async confirmAlert(xml: string) {
        const alertButtons = [
            {
                text: 'Cancel',
                role: 'cancel',
                htmlAttributes: {
                    'aria-label': 'cancel',
                },
            },
            {
                text: 'OK',
                role: 'confirm',
                htmlAttributes: {
                    'aria-label': 'confirm',
                },
                handler: () => {
                    const data: Blob = new Blob([xml], {
                        type: XML_TYPE,
                    });
                    FileSaver.saveAs(
                        data,
                        'Export_' + new Date().getTime() + XML_EXTENSION
                    );
                },
            },
        ];
        const alert = await this.alertController.create({
            subHeader: this.translate.instant('EXPLAIN_FILE_FORMAT'),
            message: this.translate.instant('CONFIRM_DOWNLOAD_FILE'),
            buttons: alertButtons,
        });

        await alert.present();
    }

    downloadXML(xml: string) {
        const filename = 'export_' + new Date().getTime() + XML_EXTENSION;
        const pom: any = document.createElement('a');
        const bb = new Blob([xml], { type: 'text/plain' });

        pom.setAttribute('href', window.URL.createObjectURL(bb));
        pom.setAttribute('download', filename);

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
        pom.style.display = "none";
        document.body.appendChild(pom);
        pom.click();
    }
}
