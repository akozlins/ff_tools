
.PHONY: tab-retach
tab-retach:
	convert -strip -size 48x48 canvas:black $@/icon.png
	zip -r -FS $@.zip $@/*
