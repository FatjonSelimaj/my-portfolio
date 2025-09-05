import CookieManageButton from "../components/CookieManageButton";

export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
            <h1>Privacy Policy</h1>
            <p>Questa informativa spiega come raccogliamo e trattiamo i dati personali tramite questo sito.</p>

            <h2>Titolare del trattamento</h2>
            <p>Nome azienda / persona – Email: esempio@dominio.it – Indirizzo: Via Esempio 1, Città (IT)</p>

            <h2>Dati trattati e finalità</h2>
            <ul>
                <li>Registrazione/contatto: nome, email – per rispondere e gestire l’account.</li>
                <li>Analytics (GA4): dati di utilizzo aggregati e anonimizzati, previa accettazione cookie.</li>
            </ul>

            <h2>Base giuridica</h2>
            <ul>
                <li>Contratto/legittimo interesse per erogazione servizi richiesti.</li>
                <li>Consenso per cookie/analytics non essenziali.</li>
            </ul>

            <h2>Conservazione</h2>
            <p>Per il tempo necessario alle finalità indicate o obblighi di legge.</p>

            <h2>Condivisioni</h2>
            <p>Provider tecnici (hosting, email). Google (Analytics) come responsabile esterno.</p>

            <h2>Trasferimenti extra-UE</h2>
            <p>Possibili verso USA con Clausole Contrattuali Standard di Google.</p>

            <h2>Diritti</h2>
            <p>Accesso, rettifica, cancellazione, portabilità, opposizione: scrivi a noi.</p>

            <h2>Cookie e consenso</h2>
            <p>
                Puoi modificare le preferenze in qualsiasi momento.
                <CookieManageButton />
            </p>
        </main>
    );
}
