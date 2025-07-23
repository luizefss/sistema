// src/pages/auth/AuthPage.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Check, Eye, EyeOff, FileText, Gauge, MessageSquare, Star, Users } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// --- COMPONENTES INTERNOS PARA MELHORAR A ESTRUTURA ---

// Cabeçalho Profissional
const PageHeader = () => (
  <header className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-80">
        <Building2 className="w-6 h-6 text-blue-400" />
        <span>Sua Obra Regular</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/#servicos" className="text-slate-300 hover:text-white transition-colors">Serviços</Link>
        <Link to="/ferramenta-para-profissionais" className="text-slate-300 hover:text-white transition-colors">Ferramenta</Link>
        <Link to="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link>
      </nav>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold hidden md:flex">
        <Link to="/">Voltar ao Site Principal</Link>
      </Button>
    </div>
  </header>
);

// Rodapé Consistente
const PageFooter = () => (
  <footer className="bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-4 py-6 text-center text-slate-400">
      <p>© { new Date().getFullYear() } Sua Obra Regular. Todos os direitos reservados.</p>
    </div>
  </footer>
);

// Input com Máscara para WhatsApp
const MaskedInput = ( props: React.InputHTMLAttributes<HTMLInputElement> ) =>
{
  const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) =>
  {
    let value = e.target.value.replace( /\D/g, '' );
    if ( value.length > 11 ) value = value.slice( 0, 11 );
    value = value.replace( /^(\d{2})(\d)/g, '($1) $2' );
    value = value.replace( /(\d{5})(\d)/, '$1-$2' );
    e.target.value = value;
  };
  return <Input { ...props } onChange={ handleInputChange } />;
};

// --- FORMULÁRIOS (Lógica de UI, sem integração de backend) ---
const LoginForm = ( { onResetRequest }: { onResetRequest: () => void } ) =>
{
  const [ showPassword, setShowPassword ] = useState( false );
  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-300">Email</label>
        <Input type="email" placeholder="seu@email.com" className="bg-slate-700 border-slate-600 text-white h-12 mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">Senha</label>
        <div className="relative">
          <Input type={ showPassword ? "text" : "password" } placeholder="••••••••" className="bg-slate-700 border-slate-600 text-white h-12 mt-1 pr-10" />
          <button type="button" onClick={ () => setShowPassword( !showPassword ) } className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400">
            { showPassword ? <EyeOff size={ 20 } /> : <Eye size={ 20 } /> }
          </button>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">Entrar</Button>
      <p onClick={ onResetRequest } className="text-center text-sm text-blue-400 hover:underline cursor-pointer">Esqueceu a sua senha?</p>
    </form>
  );
};

const RegisterForm = () =>
{
  const [ showPassword, setShowPassword ] = useState( false );
  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-300">Nome completo</label>
        <Input type="text" placeholder="João da Silva" className="bg-slate-700 border-slate-600 text-white h-12 mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">Email</label>
        <Input type="email" placeholder="seu@email.com" className="bg-slate-700 border-slate-600 text-white h-12 mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">WhatsApp</label>
        <MaskedInput type="tel" placeholder="(XX) XXXXX-XXXX" className="bg-slate-700 border-slate-600 text-white h-12 mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300">Senha</label>
        <div className="relative">
          <Input type={ showPassword ? "text" : "password" } placeholder="Crie uma senha forte" className="bg-slate-700 border-slate-600 text-white h-12 mt-1 pr-10" />
          <button type="button" onClick={ () => setShowPassword( !showPassword ) } className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400">
            { showPassword ? <EyeOff size={ 20 } /> : <Eye size={ 20 } /> }
          </button>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">Criar Conta e Iniciar Teste</Button>
    </form>
  );
};

const ResetPasswordForm = ( { onCancel }: { onCancel: () => void } ) => (
  <div className="space-y-4">
    <h3 className="font-bold text-center">Recuperar Senha</h3>
    <p className="text-center text-sm text-slate-400">Insira o seu email para receber o link de recuperação.</p>
    <Input type="email" placeholder="seu@email.com" className="bg-slate-700 border-slate-600 text-white h-12" />
    <Button size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">Enviar Link</Button>
    <p onClick={ onCancel } className="text-center text-sm text-blue-400 hover:underline cursor-pointer">Voltar para o Login</p>
  </div>
);


// --- DADOS DA PÁGINA ---
const professionalPlan = {
  name: 'Plataforma Profissional',
  price: 50,
  period: 'Mensal',
  features: [
    { text: 'Cálculos Ilimitados de Fator de Ajuste', icon: <Gauge className="w-5 h-5 text-blue-400" /> },
    { text: 'Link Pessoal para Captura de Leads', icon: <Users className="w-5 h-5 text-blue-400" /> },
    { text: 'Relatórios Profissionais em PDF', icon: <FileText className="w-5 h-5 text-blue-400" /> },
    { text: 'Painel de Gestão de Clientes', icon: <Building2 className="w-5 h-5 text-blue-400" /> },
    { text: 'Suporte Prioritário via WhatsApp', icon: <MessageSquare className="w-5 h-5 text-blue-400" /> },
  ],
};

const testimonials = [
  {
    quote: "Esta ferramenta transformou a minha consultoria. O que eu levava horas em planilhas, agora faço em minutos. A captura de leads com o link pessoal é genial!",
    author: "Ana Silva",
    role: "Contabilista, São Paulo - SP",
    avatar: "https://ui-avatars.com/api/?name=Ana+Silva&background=2563eb&color=fff&bold=true"
  },
  {
    quote: "Indispensável para qualquer profissional da área. A precisão dos cálculos e os relatórios em PDF impressionam os meus clientes e poupam-me um tempo valioso.",
    author: "Marcos Rocha",
    role: "Engenheiro Civil, Rio de Janeiro - RJ",
    avatar: "https://ui-avatars.com/api/?name=Marcos+Rocha&background=7c3aed&color=fff&bold=true"
  }
];

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
const AuthPage = () =>
{
  const [ isResetRequested, setIsResetRequested ] = useState( false );

  return (
    <>
      <Helmet>
        <title>Plataforma para Profissionais | Sua Obra Regular</title>
        <meta name="description" content="Aceda à sua conta ou inicie o seu teste gratuito. A ferramenta completa para profissionais de regularização de obras." />
        <link rel="canonical" href="https://suaobraregular.com.br/auth" />
      </Helmet>
      <div className="min-h-screen bg-slate-900 text-white">
        <PageHeader />

        <main className="container mx-auto px-4 py-16 sm:py-24">
          <motion.div
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.6 } }
            className="text-center mb-16"
          >
            <div className="inline-block bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
              PARA PROFISSIONAIS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Eleve o Nível do seu Serviço de Regularização
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Abandone as planilhas. Automatize seus cálculos, capture mais leads e entregue valor real aos seus clientes.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Coluna da Esquerda: Apresentação do Plano */ }
            <motion.div
              initial={ { opacity: 0, x: -30 } }
              animate={ { opacity: 1, x: 0 } }
              transition={ { duration: 0.7, delay: 0.2 } }
              className="lg:col-span-2"
            >
              <Card className="border-2 border-blue-800 shadow-2xl bg-slate-800/50 p-6">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-3xl text-white">{ professionalPlan.name }</CardTitle>
                  <div className="mt-2">
                    <span className="text-5xl font-bold text-white">R$ { professionalPlan.price }</span>
                    <span className="text-slate-400 ml-2">/{ professionalPlan.period }</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    { professionalPlan.features.map( ( feature, index ) => (
                      <li key={ index } className="flex items-center gap-4">
                        <div className="bg-slate-700 rounded-full p-2">
                          { feature.icon }
                        </div>
                        <span className="text-slate-200 text-lg">{ feature.text }</span>
                      </li>
                    ) ) }
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coluna da Direita: Login e Registo */ }
            <motion.div
              initial={ { opacity: 0, x: 30 } }
              animate={ { opacity: 1, x: 0 } }
              transition={ { duration: 0.7, delay: 0.4 } }
              className="lg:col-span-3"
            >
              <Card className="w-full shadow-2xl border border-slate-700 bg-slate-800">
                <CardContent className="p-0">
                  <Tabs defaultValue="register" className="w-full">
                    <TabsList className="grid grid-cols-2 w-full h-16 rounded-t-lg bg-slate-900 p-1">
                      <TabsTrigger value="login" className="h-full text-lg rounded-md data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400">Entrar</TabsTrigger>
                      <TabsTrigger value="register" className="h-full text-lg rounded-md data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400">Criar Conta</TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={ isResetRequested ? "reset" : "forms" }
                        initial={ { opacity: 0, y: 10 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -10 } }
                        transition={ { duration: 0.3 } }
                      >
                        { isResetRequested ? (
                          <div className="p-8">
                            <ResetPasswordForm onCancel={ () => setIsResetRequested( false ) } />
                          </div>
                        ) : (
                          <>
                            <TabsContent value="login" className="p-8">
                              <h2 className="text-2xl font-bold text-center mb-1">Bem-vindo de volta!</h2>
                              <p className="text-slate-400 text-center mb-6">Aceda ao seu painel.</p>
                              <LoginForm onResetRequest={ () => setIsResetRequested( true ) } />
                            </TabsContent>
                            <TabsContent value="register" className="p-8">
                              <h2 className="text-2xl font-bold text-center mb-1">Crie a sua Conta</h2>
                              <p className="text-slate-400 text-center mb-6">Comece o seu <span className="font-semibold text-green-400">teste gratuito de 1 dia</span> agora mesmo.</p>
                              <RegisterForm />
                            </TabsContent>
                          </>
                        ) }
                      </motion.div>
                    </AnimatePresence>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Secção de Depoimentos */ }
          <section className="mt-24" id="depoimentos">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">O que Outros Profissionais Dizem</h2>
              <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">Junte-se a dezenas de especialistas que já otimizaram o seu trabalho.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              { testimonials.map( ( testimonial, index ) => (
                <motion.div
                  key={ index }
                  initial={ { opacity: 0, y: 20 } }
                  whileInView={ { opacity: 1, y: 0 } }
                  viewport={ { once: true, amount: 0.5 } }
                  transition={ { delay: 0.1 * index, duration: 0.5 } }
                >
                  <Card className="h-full bg-slate-800 shadow-lg border border-slate-700">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <img src={ testimonial.avatar } alt={ testimonial.author } className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <p className="font-bold text-white">{ testimonial.author }</p>
                          <p className="text-slate-400">{ testimonial.role }</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        { [ ...Array( 5 ) ].map( ( _, i ) => <Star key={ i } className="w-5 h-5 text-yellow-400 fill-yellow-400" /> ) }
                      </div>
                      <p className="text-slate-300 italic text-lg">"{ testimonial.quote }"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) ) }
            </div>
          </section>
        </main>

        <PageFooter />
      </div>
    </>
  );
};

export default AuthPage;
