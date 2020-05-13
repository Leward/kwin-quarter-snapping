PROJECT_NAME = quarter-snapping
PROJECT_VER  = 0.1

debug:
	qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.showInteractiveKWinConsole

install:
	plasmapkg2 --type kwinscript --install .
	# plasmapkg --type kwinscript -i /path/to/myscript.kwinscript

uninstall:
	plasmapkg2 --type kwinscript --remove quarter-snapping