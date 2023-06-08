/* eslint-disable */
export type CAuthorisation = {
  Basicauth?: string | undefined
}

export type CVehicle = {
  Make?: string | undefined
  Model?: string | undefined
  Version?: string | undefined
  FirstRegistration?: string | undefined
  Color?: string | undefined
  Mileage?: number | undefined
  Location?: string | undefined
  Site?: string | undefined
  Status?: string | undefined
  OfferPrice?: number | undefined
  FUID?: string | undefined
  VIN?: string | undefined
  FremdID?: string | undefined
  DistributionType?: string | undefined
  Background?: number | undefined
  VehicleOptions?: CVehicleOptions[] | undefined
}

export type CDealer = {
  ID?: number | undefined
  Company?: string | undefined
  'Straße'?: string | undefined
  PLZ?: string | undefined
  Ort?: string | undefined
  Land?: string | undefined
  Telefon?: string | undefined
  Telefax?: string | undefined
  Email?: string | undefined
  'Geschäftsführer'?: string | undefined
  Registergericht?: string | undefined
  Registernummer?: string | undefined
  USTIDNR?: string | undefined
  Steuernummer?: string | undefined
  Unterlagen?: boolean | undefined
  aktiv?: boolean | undefined
  Bemerkung?: string | undefined
  BieterID?: number | undefined
  User?: CDealerUser[] | undefined
}

export type CSuccess = {
  Status?: boolean | undefined
  Code?: number | undefined
  Beschreibung?: string | undefined
}

export type CDealerUser = {
  ID?: number | undefined
  CompanyID?: number | undefined
  UserGUID?: string | undefined
  Anrede?: string | undefined
  Vorname?: string | undefined
  Nachname?: string | undefined
  Telefon?: string | undefined
  Telefax?: string | undefined
  Email?: string | undefined
  Password?: string | undefined
  aktiv?: boolean | undefined
  Bemerkung?: string | undefined
}

export type CBiddingVehicle = {
  BiddingID?: number | undefined
  F_UID?: string | undefined
  Interne_Nummer?: string | undefined
  Hersteller?: string | undefined
  Modell?: string | undefined
  Version?: string | undefined
  Erstzulassung?: string | undefined
  KM_Stand?: string | undefined
  Treibstoff?: string | undefined
  Farbe?: string | undefined
  GrundFarbe?: string | undefined
  Hubraum?: string | undefined
  Leistung?: string | undefined
  Antrieb?: string | undefined
  Schaltung?: string | undefined
  Aufbauart?: string | undefined
  LagerortPLZ?: string | undefined
  Besteuerung?: string | undefined
  Vorbesitzer?: number | undefined
  Minderwerte?: number | undefined
  Ausschreibung?: string | undefined
  Ausschreibung_Ends?: string | undefined
  mein_Aktuelles_Gebot?: number | undefined
  Dokumente?: boolean | undefined
  Bilder?: boolean | undefined
  'Schäden_repariert'?: CVehicleDamage[] | undefined
  'Schäden_unrepariert'?: CVehicleDamage[] | undefined
  'Schäden_Bemerkung'?: string | undefined
  'Schäden_repariert_Summe'?: number | undefined
  'Schäden_unrepariert_Summe'?: number | undefined
}

export type CfilterBiddings = {
  Fabrikat?: string | undefined
  Modell?: string | undefined
  kmStand_von?: string | undefined
  kmStand_bis?: string | undefined
  Erstzulassung_von?: string | undefined
  Erstzulassung_bis?: string | undefined
  Hubraum_von?: string | undefined
  Hubraum_bis?: string | undefined
  Leistung_von?: string | undefined
  Leistung_bis?: string | undefined
  Minderwerte_von?: string | undefined
  Minderwerte_bis?: string | undefined
  Treibstoff?: string | undefined
  Farbschema?: string | undefined
  Antrieb?: string | undefined
  Schaltung?: string | undefined
  Aufbauart?: string | undefined
  'Reparierte_Schäden'?: boolean | undefined
  'unreparierte_Schäden'?: boolean | undefined
  Dokumente?: boolean | undefined
}

export type CBiddingDoc = {
  F_UID?: string | undefined
  Interne_Nummer?: string | undefined
  DocID?: string | undefined
  DocType?: string | undefined
  DocName?: string | undefined
  DocPath?: string | undefined
}

export type CBiddingforVehicle = {
  BiddingDate?: string | undefined
  FremdID?: string | undefined
  BiddingValue?: number | undefined
  rejectBidding?: boolean | undefined
}

export type CBidding = {
  ID?: number | undefined
  Ausschreibung?: string | undefined
  Beschreibung?: string | undefined
  Start?: string | undefined
  Ende?: string | undefined
}

export type CgetBiddingVehicle = {
  UserGUID?: string | undefined
  FremdID?: string | undefined
}

export type CVehicleDamage = {
  Beschreibung?: string | undefined
  'Schadenshöhe'?: number | undefined
}

export type CVehicleOptions = {
  OptionsName?: string | undefined
  OptionsSort?: number | undefined
}

export type CListBiddingVehicle = {
  filterBiddingID?: string[] | undefined
  filterFabrikat?: string[] | undefined
  filterModell?: string[] | undefined
  filterTreibstoff?: string[] | undefined
  filterFarbschema?: string[] | undefined
  filterAntrieb?: string[] | undefined
  filterSchaltung?: string[] | undefined
  filterAufbau?: string[] | undefined
  BiddingVehicle?: CBiddingVehicle[] | undefined
}
