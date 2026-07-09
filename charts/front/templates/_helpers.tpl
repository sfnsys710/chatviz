{{/*
Thin wrappers over the shared `common` library chart (charts/common).
The naming + label logic lives once in common; these just expose it under the
chart-local names the app templates already call. Passing `.` keeps the caller's
context, so common.* resolves .Chart/.Values/.Release to THIS chart.
*/}}
{{- define "front.name" -}}{{ include "common.name" . }}{{- end }}
{{- define "front.fullname" -}}{{ include "common.fullname" . }}{{- end }}
{{- define "front.chart" -}}{{ include "common.chart" . }}{{- end }}
{{- define "front.labels" -}}{{ include "common.labels" . }}{{- end }}
{{- define "front.selectorLabels" -}}{{ include "common.selectorLabels" . }}{{- end }}
{{- define "front.serviceAccountName" -}}{{ include "common.serviceAccountName" . }}{{- end }}
