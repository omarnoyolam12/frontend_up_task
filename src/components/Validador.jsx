
const Validador = ({valido}) => {
    return (
        <div className={`w-[24px] h-[24px] rounded-full flex justify-center items-center ${valido ? 'bg-indigo-400' : 'bg-red-400'} absolute right-0 top-3`}>
            {valido ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l5 5l10 -10" />
                </svg>

            ) : 
            (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            )}
        </div>
    )
}

export default Validador