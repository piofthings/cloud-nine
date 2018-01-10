import * as ko from "knockout";

export class SettingsViewModel
{
    public azureStorageHostName: KnockoutObservable<string> = ko.observable<string>("");
    public containerName: KnockoutObservable<string> = ko.observable<string>("");
    public sasTokenSignature: KnockoutObservable<string> = ko.observable<string>("");
    public sasTokenStartDate: KnockoutObservable<Date> = ko.observable<Date>();
    public sasTokenEndDate: KnockoutObservable<Date> = ko.observable<Date>();
    public cacheFolderName: KnockoutObservable<string> = ko.observable<string>("");
    public rootPath: KnockoutObservable<string> = ko.observable<string>("");
    public ipAddresses: KnockoutObservable<string> = ko.observable<string>("");

    public static fromJS = (data: any) : SettingsViewModel =>{
        let newVm = new SettingsViewModel();
        newVm.azureStorageHostName(data.azureStorageHostName);
        newVm.containerName(data.containerName);
        newVm.sasTokenEndDate(data.sasTokenEndDate);
        newVm.sasTokenStartDate(data.sasTokenStartDate);
        newVm.sasTokenSignature(data.sasTokenSignature);
        newVm.cacheFolderName(data.cacheFolderName);
        newVm.rootPath(data.rootPath);
        newVm.ipAddresses(data.ipAddresses);
        return newVm;
    }
}
