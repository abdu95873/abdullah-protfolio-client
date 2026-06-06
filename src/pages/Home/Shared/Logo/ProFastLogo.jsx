const ProFastLogo = () => {
    return (
        <div className="inline-flex items-center gap-2 sm:gap-3 select-none">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 p-[2px] shadow-md shadow-blue-500/30">
                <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center">
                    <span className="text-xs sm:text-base font-extrabold tracking-tight text-blue-700">
                        AB
                    </span>
                </div>
            </div>

            <div className="leading-tight">
                <p className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900">
                    Abdullah
                </p>
                <p className="hidden sm:block text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-600">
                    Web Developer
                </p>
            </div>
        </div>
    );
};

export default ProFastLogo;