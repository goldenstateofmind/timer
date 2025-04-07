# https://kyleshevlin.com/make-checkpoint/
# make checkpoint
# https://bost.ocks.org/mike/make/


checkpoint:
	@git add -A
	@git commit -m "checkpoint at $$(date '+%Y-%m-%dT%H:%M:%S%z')"
	@git push
	@echo Checkpoint created and pushed to remote
