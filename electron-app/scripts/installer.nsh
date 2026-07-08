!macro customInstall
  DetailPrint "Installing CH340 USB Driver..."
  ExecWait '"$INSTDIR\resources\drivers\CH341SER.EXE" /S'
!macroend
