# Cronograma de Desenvolvimento

## 1. Configuração inicial
- [x] Criar repositório no GitHub.
- [x] Configurar ambiente de desenvolvimento.
- [x] Criar projeto React Native.
- [x] Add o Expo.
- [x] Configurar estrutura de diretórios.
- [x] Configurar navegação entre telas.
- [x] Definir arquitetura do sistema.
- [x] Configurar conexão com o servidor.

## 2. Banco de dados e backend
- [x] Criar banco de dados Firebase.
- [x] Implementar API de comunicação com o banco.
- [x] Implementar validação dos dados recebidos.

## 3. Autenticação e gerenciamento de usuários
- [x] Criar View de Login.
- [x] Criar View de Cadastro de Empresa.
- [x] Criar View de Recuperação de Senha.
- [x] Implementar autenticação de usuários.
- [x] Implementar criptografia/hash de senhas.
- [x] Implementar controle de sessão.
- [ ] Implementar níveis de acesso (Administrador, Agendador e Executor).
- [ ] Implementar middleware de autenticação.
- [ ] Implementar controle de permissões.
- [ ] Implementar isolamento de dados por empresa.
- [ ] Criar CRUD de funcionários.
- [ ] Implementar associação de funcionários às empresas.

## 4. Interface administrativa
- [ ] Criar View Dashboard Administrativo.
- [ ] Criar View de Gerenciamento de Funcionários.
- [ ] Criar View de Cadastro de Funcionários.
- [ ] Criar View de Edição de Funcionários.
- [ ] Criar View de Gerenciamento de Empresas.
- [ ] Criar componentes reutilizáveis de formulários.
- [ ] Implementar navegação administrativa.
- [ ] Implementar exibição de informações conforme permissões.

## 5. Gerenciamento de serviços
- [ ] Criar View de Listagem de Serviços.
- [ ] Criar View de Cadastro de Serviços.
- [ ] Criar View de Edição de Serviços.
- [ ] Implementar CRUD de serviços.
- [ ] Implementar definição de duração estimada.
- [ ] Implementar definição de prazo máximo de execução.
- [ ] Implementar cadastro de informações adicionais.
- [ ] Implementar associação de serviços aos funcionários.
- [ ] Implementar cadastro de tarefas personalizadas.

## 6. Sistema de agendamentos
- [ ] Criar View de Novo Agendamento.
- [ ] Criar View de Edição de Agendamento.
- [ ] Criar View de Listagem de Agendamentos.
- [ ] Implementar seleção de serviço.
- [ ] Implementar seleção de funcionário responsável.
- [ ] Implementar seleção de data e horário.
- [ ] Implementar cadastro de endereço.
- [ ] Implementar campo de observações.
- [ ] Desenvolver algoritmo de verificação de disponibilidade.
- [ ] Implementar validação de conflitos de horários.
- [ ] Implementar cálculo de duração dos agendamentos.
- [ ] Implementar reagendamento e cancelamento.
- [ ] Implementar atualização automática dos registros.

## 7. Calendário e visualização
- [ ] Criar View de Calendário.
- [ ] Implementar visualização diária.
- [ ] Implementar visualização semanal.
- [ ] Implementar visualização mensal.
- [ ] Criar componente de linha do tempo diária.
- [ ] Implementar exibição dos horários agendados.
- [ ] Implementar identificação visual de conflitos.
- [ ] Implementar filtros por funcionário.
- [ ] Implementar filtros por serviço.
- [ ] Implementar filtros por status.
- [ ] Integrar calendário com os dados do backend.

## 8. Execução dos serviços
- [ ] Criar View inicial do Executor.
- [ ] Criar View de Serviços Agendados.
- [ ] Criar View de Detalhes do Serviço.
- [ ] Criar View de Execução.
- [ ] Implementar botão de iniciar serviço.
- [ ] Implementar registro automático do horário de início.
- [ ] Implementar botão de finalizar serviço.
- [ ] Implementar registro automático do horário de término.
- [ ] Implementar cálculo do tempo real de execução.
- [ ] Implementar formulário de observações.
- [ ] Implementar registro de justificativas para atrasos.
- [ ] Implementar validação de status da execução.
- [ ] Implementar histórico de serviços realizados.

## 9. Integrações externas
- [ ] Integrar API de mapas.
- [ ] Implementar geocodificação de endereços.
- [ ] Implementar visualização de mapas.
- [ ] Implementar obtenção de localização GPS.
- [ ] Implementar cálculo e visualização de rotas.
- [ ] Integrar API de previsão do tempo.
- [ ] Implementar consulta climática por localização e data.
- [ ] Implementar tratamento de indisponibilidade das APIs externas.

## 10. Câmera e armazenamento de arquivos
- [ ] Implementar solicitação de permissão para câmera.
- [ ] Implementar captura de fotografias.
- [ ] Criar componente de visualização de imagens.
- [ ] Implementar envio de imagens para o servidor.
- [ ] Implementar armazenamento de fotografias.
- [ ] Associar fotografias aos registros de execução.
- [ ] Implementar otimização e compressão de imagens.

## 11. Notificações e acompanhamento
- [ ] Implementar sistema de notificações.
- [ ] Implementar notificações de novos agendamentos.
- [ ] Implementar notificações de alterações.
- [ ] Implementar notificações de cancelamentos.
- [ ] Implementar notificações de proximidade de prazos.
- [ ] Implementar identificação de serviços atrasados.
- [ ] Criar View de Notificações.
- [ ] Criar View de Acompanhamento de Serviços.
- [ ] Implementar atualização dos status dos serviços.
- [ ] Implementar consulta do histórico completo de execução.

## 12. Segurança e validação
- [ ] Implementar comunicação HTTPS.
- [ ] Validar autenticação em todas as rotas protegidas.
- [ ] Validar permissões de acesso.
- [ ] Verificar isolamento dos dados entre empresas.
- [ ] Implementar tratamento global de erros.
- [ ] Implementar mensagens de erro e conexão.
- [ ] Implementar mecanismos de backup.
- [ ] Verificar integridade dos registros.
- [ ] Adequar tratamento de dados à LGPD.

## 13. Integração e testes
- [ ] Integrar frontend e backend.
- [ ] Testar operações CRUD.
- [ ] Testar autenticação e autorização.
- [ ] Testar todos os níveis de acesso.
- [ ] Testar isolamento entre empresas.
- [ ] Testar criação e edição de agendamentos.
- [ ] Testar algoritmo de disponibilidade.
- [ ] Testar conflitos de horários.
- [ ] Testar início e finalização de serviços.
- [ ] Testar envio e armazenamento de fotografias.
- [ ] Testar APIs externas.
- [ ] Testar notificações.
- [ ] Realizar testes de responsividade.
- [ ] Corrigir bugs identificados.

## 14. Finalização
- [ ] Revisar código-fonte.
- [ ] Refatorar componentes e funções.
- [ ] Verificar todos os requisitos funcionais.
- [ ] Verificar todos os requisitos não funcionais.
- [ ] Realizar testes finais em Android.
- [ ] Atualizar documentação técnica.
- [ ] Organizar versão final no GitHub.
- [ ] Preparar apresentação do projeto.
- [ ] Realizar entrega final.
