{{/*
Thin wrappers over the shared `common` library chart (charts/common).
The naming + label logic lives once in common; these just expose it under the
chart-local names the app templates already call. Passing `.` keeps the caller's
context, so common.* resolves .Chart/.Values/.Release to THIS chart.
*/}}
{{- define "agent.name" -}}{{ include "common.name" . }}{{- end }}
{{- define "agent.fullname" -}}{{ include "common.fullname" . }}{{- end }}
{{- define "agent.chart" -}}{{ include "common.chart" . }}{{- end }}
{{- define "agent.labels" -}}{{ include "common.labels" . }}{{- end }}
{{- define "agent.selectorLabels" -}}{{ include "common.selectorLabels" . }}{{- end }}
{{- define "agent.serviceAccountName" -}}{{ include "common.serviceAccountName" . }}{{- end }}
