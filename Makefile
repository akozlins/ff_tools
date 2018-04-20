
.PHONY: tab-retach
tab-retach:
	convert -strip -size 48x48 canvas:black $@/icon.png
	( cd $@ ; zip -r -FS ../$@.zip * )

.PHONY: tab-reload
tab-reload:
	convert -strip -size 48x48 canvas:black $@/icon.png
	( cd $@ ; zip -r -FS ../$@.zip * )
